const dayjs = require('dayjs');
const LocalizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(LocalizedFormat);

module.exports = dayjs;
