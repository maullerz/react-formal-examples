import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './redux-store';
import {
  App,
  Welcome,
  Examples,
} from './routes';
import AuthForm from './components/Forms/AuthForm';
import ValidationsForm from './components/Forms/ValidationsForm';


const store = configureStore();

const routes = (
  <Route name="app" path="/" component={App}>
    <IndexRoute component={Welcome} />
    <Route path='welcome' component={Welcome}/>

    <Route path='examples' component={Examples}>
      <IndexRoute component={AuthForm} />
      <Route path='auth' component={AuthForm} />
      <Route path='validations' component={ValidationsForm} />
    </Route>
  </Route>
);


ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </Provider>
  ), document.getElementById('root')
);


if (module.hot) {
  module.hot.accept();

  // fix hot module replacement for reducers
  module.hot.accept('./ducks/index', () => {
    const nextRootReducer = require('./ducks/index');

    store.replaceReducer(nextRootReducer);
  });
}
