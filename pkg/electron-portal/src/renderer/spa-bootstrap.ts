// For React test
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );

// import 'zone.js';
import * as singleSpa from 'single-spa';
import { loadApp } from '../helper';

async function bootstrap() {
  const root = `${process.cwd()}/../../release/electron-portal`;
  console.log('bootstrap root ', root);

  await loadApp('app1', '/app1', `file://${root}/app1/singleSpaEntry.js`);

  // console.log('electron bootstrap');
  // await loadApp('app1', '/app1', '/app1/singleSpaEntry.js');

  singleSpa.start();
}

bootstrap();