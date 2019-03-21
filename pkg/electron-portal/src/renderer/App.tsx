import * as React from 'react';
import { hot } from 'react-hot-loader';

class App extends React.Component<{},{}> {
  public render() {
    return (
      <div className='app'>
        <h4>Welcome to React, Electron and Typescript</h4>
        <p>Hello</p>
      </div>
    );
  }
}

export default hot(module)(App);
