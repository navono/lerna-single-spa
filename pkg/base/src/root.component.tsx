import * as React from 'react';
import { Provider } from "react-redux";
import { Dispatch, Store } from "redux";
import { Result } from 'ant-design-pro';

interface IRootProps {
  dispatch: Dispatch;
  store: Store;
  globalEventDistributor: any;
}

class Root extends React.Component<IRootProps, {}> {
  state = {
    store: this.props.globalEventDistributor.stores.get('base'),
    globalEventDistributor: this.props.globalEventDistributor,
  };

  componentDidCatch(error: any, info: any) {
    console.log(error, info);
  }

  handleGlobal = () => {
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <button onClick={this.handleGlobal}>
          tirgger global action
        </button>
        <Result type="success" />
      </Provider>
    );
  }
}

export default Root;
