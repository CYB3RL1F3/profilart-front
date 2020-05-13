import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "components/routes/PrivateRoute";
import { Login, Main, Visualize, Posts, Register } from "containers";
import { Location } from "history";
import ForgottenPassword from "containers/ForgottenPassword";
import Maintenance from './containers/Maintenance';
import Err404 from "containers/Err404";
import { Support } from "containers/Support";
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
      <Route exact path="/support" component={Support}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/forgotten-password" component={ForgottenPassword}/>
      <Route exact path="/maintenance" component={Maintenance}/>
      <Route component={Err404}/>
    </Switch>
  )
}