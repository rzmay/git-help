const dayjs = require('lib/dayjs');
// const getGitHubPayload = require('lib/helpers/getGithubPayload');
const Account = require('lib/models/Account');
const Complaint = require('lib/models/Complaint');
const Issue = require('lib/models/Issue');
const { getCompletion } = require('lib/services/openai.service');

const getTools = () => {
  return [
    {
      type: 'function',
      function: {
        name: 'update_issue',
        description: 'Update an issue',
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
            },
          },
        },
      },
    },
  ];
};

module.exports = async function handleIssue(job) {
  console.log(`Handling issue: ${job.id}`);

  try {
    const issue = await Issue.findById(job.id);
    const account = await Account.findById(issue?.account);

    if (!issue) throw new Error('Issue not found');

    // Get complaints
    const complaints = await Complaint
      .find({ account: account.id, issue: job.id })
      .select('page body')
      .limit(20);

    // Call openAI, updating fields
    const prompt = `
    The following is an issue in our codebase:
    ${JSON.stringify({
    id: issue.id,
    complaints: issue.complaints,
    title: issue.title,
    description: issue.description,
    labels: issue.labels,
  })}

    The following is a list of recent customer complaints assoicated with this issue:
    ${complaints.map((complaint) => JSON.stringify({
    created: dayjs(complaint.created),
    complaint: complaint.body,
    page: complaint.page,
  })).join('\n')}

    Use the new associated customer complaints to update the issue's information by calling the update_issue function.
    If all of the information on the issue looks complete and correct, you may not have to change the information at all.
    Try not to change the title too much, it should stay pretty consistent.
    `;

    const tools = getTools();
    const completion = await getCompletion(prompt, tools);
    const functionCall = completion.tool_calls[0].function;

    // Parse args
    const updatedInfo = JSON.parse(functionCall.arguments);
    console.log(updatedInfo);

    // Update
    await Issue.findByIdAndUpdate(job.id, updatedInfo);
  } catch (err) {
    console.log(err);
  }
};
