import { ipcRenderer } from 'electron';
import * as singleSpa from 'single-spa';
import { loadApp } from './register';
import { GlobalEventDistributor } from './globalEventDistributor';

const globalEventDistributor = new GlobalEventDistributor();

async function bootstrap() {
  let appPath = '';
  if (process.env.NODE_ENV === 'development') {
    appPath = `${process.cwd()}/build`;
  } else {
    appPath = `${ipcRenderer.sendSync('get-app-path')}/build`;
  }

  await loadApp({
    name: 'base',
    prefix: '/base',
    appURL: `file://${appPath}/base/singleSpaEntry.js`,
    storeURL: `file://${appPath}/base/store.js`,
    base: true, 
    path: '',
    globalEventDistributor: globalEventDistributor
  });

  singleSpa.start();
}

bootstrap();