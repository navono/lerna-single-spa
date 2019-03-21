// For React test
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );

import 'zone.js';
import * as singleSpa from 'single-spa';
// import '../../libs/system';
// import { loadApp, Project } from './register';
// import { GlobalEventDistributor } from './globalEventDistributor';

// const globalEventDistributor = new GlobalEventDistributor();

// async function asuncForEach(array: any, callback: any) {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array);
//   }
// }

export function hashPrefix(prefix: string) {
  return function(location: any) {
    return location.hash.startsWith(`#${prefix}`);
  };
}

export async function loadApp(name: string, hash: string, appURL: string) {
  // const a = SystemJS.import(appURL);
  // console.log(a);
  // a.then((v: any) => console.log(v));
  
  singleSpa.registerApplication(
    name,
    () => SystemJS.import(appURL),
    hashPrefix(hash)
  );
}

async function bootstrap() {
  const root = `${process.cwd()}//dist`;
  await loadApp('app1', '/app1', `file://${root}/app1/singleSpaEntry.js`);

  singleSpa.start();
}

bootstrap();