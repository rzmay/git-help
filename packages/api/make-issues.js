const Issue = require('lib/models/Issue');
const mongoose = require('lib/mongoose');

(async () => {
  await mongoose.connect(process.env.DATABASE_URL);

  await Issue.create({
    account: 'epwK5cXK6Bk0F0dIMAK-T',
    number: 1,
    status: 'open',
    complaints: 203,
    title: 'Bug on home page',
    description: 'There is a bug on the home page.',
    labels: {
      urgency: 'critical',
      type: 'bug',
      estimated_implementation_time: 'hours',
      impact: 'wide',
    },
  });

  await Issue.create({
    account: 'epwK5cXK6Bk0F0dIMAK-T',
    number: 2,
    status: 'open',
    complaints: 4,
    title: 'Ugly page',
    description: 'Your page is so ugly',
    labels: {
      urgency: 'medium',
      type: 'improvement',
      estimated_implementation_time: 'days',
      impact: 'medium',
    },
  });

  await Issue.create({
    account: 'epwK5cXK6Bk0F0dIMAK-T',
    number: 3,
    status: 'open',
    complaints: 20,
    title: 'Should order pizza',
    description: 'I think this app should order a pizza for me',
    labels: {
      urgency: 'low',
      type: 'feature',
      estimated_implementation_time: 'months',
      impact: 'minimal',
    },
  });

  process.exit(0);
})();
