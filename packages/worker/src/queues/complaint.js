const Queue = require('bull');
const Account = require('lib/models/Account');
const Complaint = require('lib/models/Complaint');
const Issue = require('lib/models/Issue');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const issueQueue = new Queue('issue', process.env.REDIS_URL);

module.exports = async function handleComplaint(job) {
  console.log(`Handling issue: ${job.id}`);

  try {
    const complaint = await Complaint.findById(job.id);
    const account = await Account.findById(complaint.account);

    // Get all account's issues
    const issues = Issue.find({
      status: 'open',
      account: account.id,
    });

    // Call openAI, categorize complaint into issue OR create new
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'essay on why nathan is a terrible name' }],
      max_tokens: 100,
    });
    console.log(response);
    console.log("Printing");
    console.log(response.choices[0].messages);

    const issue = '';

    // Update issue for complaint
    Complaint.findByIdAndUpdate(job.id, { issue });

    // Update complaint count and add issue update to queue
    const i = await Issue.findByIdAndUpdate(issue, { $inc: { complaints: 1 } });
    await issueQueue.add(i.toJSON(), {
      removeOnComplete: true,
      removeOnFail: true,
      jobId: this.id,
    });
  } catch (err) {
    console.log(err);
  }
};
