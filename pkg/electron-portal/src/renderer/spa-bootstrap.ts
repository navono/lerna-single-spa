import * as singleSpa from 'single-spa';
// import { loadApp } from '../helper';
import { loadApp } from './register';
import { GlobalEventDistributor } from './globalEventDistributor';

const globalEventDistributor = new GlobalEventDistributor();

async function bootstrap() {
  const root = `${process.cwd()}/build`;
  console.log('bootstrap root ', root);

  // await loadApp('app1', '/app1', `file://${root}/app1/singleSpaEntry.js`);
  // await loadApp('app2', '/app2', `file://${root}/app2/singleSpaEntry.js`);

  // await loadApp({
  //   name: 'app2',
  //   prefix: '/app2',
  //   appURL: `file://${root}/app2/singleSpaEntry.js`,
  //   storeURL: `file://${root}/app2/store.js`,
  //   base: true, 
  //   path: '',
  //   globalEventDistributor: globalEventDistributor
  // });
  await loadApp({
    name: 'base',
    prefix: '/base',
    appURL: `file://${root}/base/singleSpaEntry.js`,
    storeURL: `file://${root}/base/store.js`,
    base: true, 
    path: '',
    globalEventDistributor: globalEventDistributor
  });

  singleSpa.start();
}

bootstrap();