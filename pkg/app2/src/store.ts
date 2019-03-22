import * as history from 'history';
import { configureStore } from './global/configureStore';

const hashHistory = history.createHashHistory();

export const storeInstance = configureStore();
export { hashHistory as history }
