import * as React from 'react';

import reactLogo from '../assets/react-logo.png';

export default class Root extends React.Component {
  componentDidCatch(error: any, info: any) {
    console.log(error, info);
  }

  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <img src={reactLogo} style={{ width: 100 }} /> <br />
        /app2 renders.
      </div>
    );
  }
}
