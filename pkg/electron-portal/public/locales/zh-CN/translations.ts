// tslint:disable-next-line:no-var-requires
const appLocaleData = require('react-intl/locale-data/zh');
// tslint:disable-next-line:no-var-requires
const enMessages = require('./translation.json');
export default {
  code: 'zh-CN',
  data: appLocaleData,
  messages: {
    ...enMessages,
  },
};
