import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import rootComponent from './root.component';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: rootComponent,
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
