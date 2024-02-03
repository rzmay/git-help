const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports.getCompletion = async function getCompletion(prompt, tools) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Your job is to consider a given prompt regarding issues within our codebase and customer complaints regarding those issues and call provided functions to process them.' },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo',
    tools,
    temperature: 0.5,
    tool_choice: 'auto',
  });

  return completion.choices[0].message;
};
