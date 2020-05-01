import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Router } from 'react-router';

import AppLayout from 'components/layouts';
import { Routes } from 'Routes';
import { AppState } from 'reducers';
import { History, Location } from "history";
import { Store, CombinedState, AnyAction } from "redux";
import Menu from 'components/molecules/Menu';
import { Profile } from 'types/Profile';

export interface AppProps {
  store: Store<CombinedState<AppState>, AnyAction>;
  history: History;
}

export interface AppSelector {
  authenticated: boolean;
  location: Location | null;
  profile: Profile | null;
}

export const Root: FC<AppProps> = ({ history }) => {
  const { authenticated, location, profile } = useSelector<AppState, AppSelector>(({ session, routing, user }) => ({
    authenticated: session.authenticated && session.checked,
    location: routing.location,
    profile: user.profile
  }));
  return (
    <AppLayout>
        <Router history={history}>
          { authenticated && (
            <Menu profile={profile} />
          )}
          <Routes authenticated={authenticated} location={location} />
        </Router>
    </AppLayout>
  );
};

export default Root;