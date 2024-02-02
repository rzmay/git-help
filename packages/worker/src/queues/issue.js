/*
  * Queue handler for updating issues on a timer.
  * We might not need this, but if we run into rate limits
  * when we attempt to update a bunch of issues from their
  * backlogs of complaints, we can use a queue to force the
  * worker to rest between OpenAI API calls.
*/
module.exports = async function handleIssue(job) {
  console.log(`Handling issue: ${job.id}`);

  try {
    // Calls to the OpenAI API and updating issues would go here
  } catch (err) {
    console.log(err);
  }
};
