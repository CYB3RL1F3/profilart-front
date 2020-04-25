import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import reducers from 'reducers';
import { sessionService } from 'redux-react-session';
import { createBrowserHistory } from 'history';
import { AUTHENTICATE_SUCCESS } from 'constants/user';

export const history = createBrowserHistory();

export const configureStore = (isDev: boolean) => {
  const client = axios.create({
    baseURL: 'https://profilart.fr',
    responseType: 'json'
  });

  const axiosMiddlewareConfig = {
    onSuccess: ({ action, response }: any) => {
      if (action.type === AUTHENTICATE_SUCCESS) {
        const { data } = response;
        sessionService.saveSession(data);
        sessionService.saveUser(data);
        return Promise.resolve(response);
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

export default configureStore(isDev);