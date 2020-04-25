import React, { FC } from "react";
import { History } from "history";
import App from './App';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Store, CombinedState, AnyAction } from "redux";
import { AppState } from "reducers";

export interface RootProps {
  store: Store<CombinedState<AppState>, AnyAction>;
  history: History;
}

export const Root: FC<RootProps> = ({ store, history }) => (
  <AppContainer>
    <Provider store={store}>
      <App store={store} history={history} />
    </Provider>
  </AppContainer>
);

export default Root;