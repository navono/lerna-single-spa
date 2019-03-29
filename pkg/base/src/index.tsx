// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './App';

// For dev
if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(<Root />, document.getElementById('root'));
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter: () => document.getElementById('root') as Element
});

export function bootstrap(props: any) {
  return reactLifecycles.bootstrap(props);
}

export function mount(props: any) {
  createDomElement();
  return reactLifecycles.mount(props);
}

export function unmount(props: any) {
  return reactLifecycles.unmount(props);
}

function createDomElement() {
  // Make sure there is a div for us to render into
  let el = document.getElementById('root');

  if (!el) {
    el = document.createElement('div');
    el.id = 'root';
    document.body.appendChild(el);
  }
  return el;
}
