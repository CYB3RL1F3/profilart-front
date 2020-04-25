import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "components/routes/PrivateRoute";
import { Login, Main, Visualize, Posts, Register } from "containers";
import { Location } from "history";
export interface RoutesProps {
  authenticated: boolean;
  location: Location | null;
}

export const Routes: FC<RoutesProps> = ({ authenticated, location }) => {
  return (
    <Switch>
      <PrivateRoute
          exact
          path="/"
          component={ Main }
          authenticated={authenticated}
          location={location}
      />
      <PrivateRoute
          exact
          path="/visualize"
          component={ Visualize }
          authenticated={authenticated}
          location={location}
      />
      <PrivateRoute
          exact
          path="/posts"
          component={ Posts }
          authenticated={authenticated}
          location={location}
      />
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
    </Switch>
  )
}