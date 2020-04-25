import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Router } from 'react-router';

import AppLayout from 'components/layouts';
import { Routes } from 'Routes';
import { AppState } from 'reducers';
import { History, Location } from "history";
import { Store, CombinedState, AnyAction } from "redux";

export interface AppProps {
  store: Store<CombinedState<AppState>, AnyAction>;
  history: History;
}

export interface AppSelector {
  authenticated: boolean;
  checked: boolean;
  location: Location | null;
}

export const Root: FC<AppProps> = ({ history }) => {
  const { authenticated, location } = useSelector<AppState, AppSelector>(({ session, routing }) => ({
    authenticated: session.authenticated,
    checked: session.checked,
    location: routing.location
  }));
  return (
    <AppLayout>
        <Router history={history}>
          <Routes authenticated={authenticated} location={location} />
        </Router>
    </AppLayout>
  );
};

export default Root;