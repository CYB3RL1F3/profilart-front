import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Location } from "history";

export interface PrivateRouteProps {
  component: FC<any>;
  exact: boolean;
  path: string;
  authenticated: boolean;
  location: Location | null;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ location, component, exact = false, path, authenticated }) => (
  <Route
    exact={exact}
    path={path}
    render={props => (
      authenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
            pathname: '/login',
            state: { from: location }
        }}/>
      )
    )}
  />
);

export default PrivateRoute;
