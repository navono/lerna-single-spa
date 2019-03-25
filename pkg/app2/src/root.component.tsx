import * as React from 'react';
import { Provider } from "react-redux";
import { Router, Route, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { Dispatch, Store } from "redux";
import { History } from 'history';
import { IStoreState } from "./global/types";
import { setGlobalSyncId } from "./global/actions";
import HomePage from "./pages/Home";
import TestPage from "./pages/Test";
import styles from "./style.css";
import { history } from './store';

interface IRootProps {
  dispatch: Dispatch;
  store: Store;
  history: History;
  globalEventDistributor: any;
}

class Root extends React.Component<IRootProps, {}> {
  state = {
    store: this.props.globalEventDistributor.stores.get('app2'),
    globalEventDistributor: this.props.globalEventDistributor,
  };

  componentDidCatch(error: any, info: any) {
    console.log(error, info);
  }

  handleGlobal = () => {
    this.state.store.dispatch(setGlobalSyncId());
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <Router history={history}>
          <div>
            {/* layout struct(like nav, sidebar...) */}
            <div className={styles["nav-container"]}>
              <NavLink exact={true} to="/">Home Page</NavLink>
              <NavLink to="/test">Test Page</NavLink>
            </div>

            {/* register routes */}
            <Route exact={true} path="/" component={HomePage} />
            <Route path="/test" component={TestPage} />

            <button onClick={this.handleGlobal}>
              tirgger global action
            </button>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default Root;
