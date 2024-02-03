const Queue = require('bull');
const getGitHubPayload = require('lib/helpers/getGithubPayload');
const Account = require('lib/models/Account');
const Complaint = require('lib/models/Complaint');
const Issue = require('lib/models/Issue');
const { createIssue } = require('lib/services/github.service');
const { getCompletion } = require('lib/services/openai.service');

const issueQueue = new Queue('issue', process.env.REDIS_URL);

const getTools = (issues) => {
  return [
    {
      type: 'function',
      function: {
        name: 'reference_issue',
        description: 'Connects a complaint to a pre-existing issue',
        parameters: {
          type: 'object',
          properties: {
            id: {
              type: String,
              description: 'The ID of the best-matching pre-existing issue',
              enum: issues.map((i) => i.id),
            },
          },
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'create_new_issue',
        description: 'Create a new issue',
        parameters: {
          type: 'object',
          properties: {
            title: {
              type: String,
              description: 'A short but descriptive title for the issue',
            },
            description: {
              type: String,
              description: 'A longer description of the issue, including who might be experiencing it and why',
            },
            labels: {
              type: 'object',
              properties: {
                urgency: {
                  type: String,
                  enum: ['low', 'medium', 'critical'],
                },
                type: {
                  type: String,
                  enum: ['bug', 'feature', 'improvement'],
                },
                estimated_implementation_time: {
                  type: String,
                  enum: ['hours', 'days', 'weeks', 'months'],
                },
                impact: {
                  type: String,
                  enum: ['minimal', 'medium', 'wide'],
                },
              },
              required: ['urgency', 'type', 'estimated_implementation_time', 'impact'],
            },
          },
          required: ['title', 'description', 'labels'],
        },
      },
    },
  ];
};

module.exports = async function handleComplaint(job) {
  console.log(`Handling complaint: ${job.id}`);

  try {
    const complaint = await Complaint.findById(job.id);
    const account = await Account.findById(complaint.account);

    // Get all account's issues
    const issues = await Issue.find({
      status: 'open',
      account: account.id,
    });

    // Call openAI, categorize complaint into issue OR create new
    const prompt = `
    The following is a list of issues our codebase is currently experiencing:

    ${issues.length ? issues.map((issue) => JSON.stringify({
    id: issue.id,
    complaints: issue.complaints,
    title: issue.title,
    description: issue.description,
    labels: issue.labels,
  })).join('\n') : '(There are currently no issues)'}

    The following is a complaint recently submitted by a user of our product:
    ${JSON.stringify({
    complaint: complaint.body,
    page: complaint.page,
  })}

    Determine if this is a new issue or if the complaint pertains to an issue that has already been recorded.
    If it is a complaint regarding a new issue, call create_new_issue.
    If it is a complaint regarding a pre-existing issue, call reference_issue.
    Only call ONE function.
    `;

    const tools = getTools(issues);
    const completion = await getCompletion(prompt, tools);
    const functionCall = completion.tool_calls[0].function;

    if (functionCall.name === 'reference_issue') {
      // Parse args
      const { id: issue } = JSON.parse(functionCall.arguments);

      // Update issue for complaint
      await Complaint.findByIdAndUpdate(job.id, { issue });

      // Update complaint count and add issue update to queue
      const i = await Issue.findByIdAndUpdate(issue, { $inc: { complaints: 1 } });
      if (!i) throw new Error(`Issue not found: ${issue}`);

      await issueQueue.add(i.toJSON(), {
        removeOnComplete: true,
        removeOnFail: true,
        jobId: i.id,
      });
    } else {
      // Parse args
      const newIssue = JSON.parse(functionCall.arguments);

      // Create new issue
      const i = await Issue.create({
        account: account.id,
        ...newIssue,
        complaints: 1,
      });

      Complaint.findByIdAndUpdate(job.id, { issue: i.id });

      const data = await createIssue(
        await getGitHubPayload(i),
        account.settings.github_owner,
        account.settings.github_repository,
        account.settings.github_token,
      );

      // Update issue number
      i.findByIdAndUpdate(job.id, {
        status: 'open',
        number: data.number,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
