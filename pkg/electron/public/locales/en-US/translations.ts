// tslint:disable-next-line:no-var-requires
const appLocaleData = require('react-intl/locale-data/en');
// tslint:disable-next-line:no-var-requires
const enMessages = require('./translation.json');
export default {
  code: 'en-US',
  data: appLocaleData,
  messages: {
    ...enMessages,
  },
};
