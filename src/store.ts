import { createStore, applyMiddleware, compose } from 'redux';

import axiosMiddleware from 'redux-axios-middleware';
import reducers from 'reducers';
import { sessionService } from 'redux-react-session';
import { createBrowserHistory } from 'history';
import { AUTHENTICATE } from 'constants/user';
import { client } from 'utils/client';

export const history = createBrowserHistory();

export const configureStore = (isDev: boolean) => {

  const axiosMiddlewareConfig = {
    onSuccess: ({ action, response, next }: any) => {
      console.log(action, response);
      const { data } = response;
      console.log(data);
      if (action.type === AUTHENTICATE) {
        if (data.authenticated) {
          sessionService.saveSession(data);
          sessionService.saveUser(data);
          next({
            type: `${action.type}_SUCCESS`,
            payload: data,
            meta: {
              previousAction: action
            }
          });
        }
      } else {
        console.log(`${action.type}_SUCCESS`);
        next({
          type: `${action.type}_SUCCESS`,
          payload: data,
          meta: {
            previousAction: action
          }
        });
      }
    },
    onError: ( { action, error, next }: any) => {
      console.log(error.response);
      let res = error.response && error.response.data && error.response.data?.error;
      let fromApi = true;
      let code, message;
      if (res) {
        code = res.code;
        message = res.message;
      }
      if (!code && !message) {
        code = error.response ? error.response.status : 500;
        message = error.response ? error.response.statusText : "uncaught fatal exception";
        fromApi = false;
      }
      next({
        type: `${action.type}_FAIL`,
        error: {
          code,
          message,
          fromApi
        },
        meta: {
          previousAction: action
        }
      });
    }
  }
  
  const composeEnhancers = (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; 

  const enhancer = composeEnhancers(
    applyMiddleware(
      axiosMiddleware(client, axiosMiddlewareConfig)
    )
  );
  const store = createStore(
      reducers,
      enhancer
    );
  
  sessionService.initSessionService(store);
  // @ts-ignore
  if (isDev && module.hot) {
      // Enable Webpack hot module replacement for reducers
        // @ts-ignore
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

  return store;
}


const isDev = process.env.NODE_ENV === "development";

const store = configureStore(isDev);

export default store;