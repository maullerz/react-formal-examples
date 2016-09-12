import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import Main from './components/Main';
import Examples from './components/Examples';
import AuthForm from './components/Forms/AuthForm';
import ValidationsForm from './components/Forms/ValidationsForm';
import './index.css';

import configureStore from './redux-store';


const store = configureStore();

const routes = (
  <Route name="app" path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path='main' component={Main}/>

    <Route path='examples' component={Examples}>
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
