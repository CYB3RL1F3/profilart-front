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
    onSuccess: ({ action, response }: any) => {
      console.log(action, response);
      if (action.type === AUTHENTICATE) {
        const { data } = response;
        if (data.authenticated) {
          sessionService.saveSession(data);
          sessionService.saveUser(data);
          return Promise.resolve(data);
        }
       
      }
    }
  }
  
  const composeEnhancers = (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; 

  // @ts-ignore
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