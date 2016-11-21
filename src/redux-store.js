import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './ducks/index';


const formatTime = time => `@${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`;


export default function configureStore(initialState) {
  let store;

  if (true) { // if DEV
    const logger = createLogger({
      collapsed: true,
      diff: true,
      predicate: (getState, action) => {
        if (action.type === '@@router/LOCATION_CHANGE') {
          console.log(
            '%c LOCATION_CHANGE:', 'color: #03A9F4',
            formatTime(new Date()),
            action.payload.pathname + action.payload.search
          );
          return false;
        }
        return true;
      },
    });

    store = createStore(
      reducers,
      initialState,
      compose(
        applyMiddleware(thunk, logger)
      )
    );

  } else {
    store = createStore(
      reducers,
      initialState,
      compose(applyMiddleware(thunk))
    );
  }

  return store;
}
