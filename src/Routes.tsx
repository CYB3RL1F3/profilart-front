import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "components/routes/PrivateRoute";
import { Login, Main, Visualize, Posts, Register, Notifications } from "containers";
import { Location } from "history";
import ForgottenPassword from "containers/ForgottenPassword";
import Maintenance from './containers/Maintenance';
import Err404 from "containers/Err404";
import { Support } from "containers/Support";
import paths from "paths";
export interface RoutesProps {
  authenticated: boolean;
  location: Location | null;
}

export const Routes: FC<RoutesProps> = ({ authenticated, location }) => {
  
  return (
    <Switch>
      <PrivateRoute
          exact
          path={paths.main}
          component={ Main }
          authenticated={authenticated}
          location={location}
      />
      <PrivateRoute
          exact
          path={paths.visualize}
          component={ Visualize }
          authenticated={authenticated}
          location={location}
      />
      <PrivateRoute
          exact
          path={paths.posts}
          component={ Posts }
          authenticated={authenticated}
          location={location}
      />
      <PrivateRoute
          exact
          path={paths.notifications}
          component={ Notifications }
          authenticated={authenticated}
          location={location}
      />
      <Route exact path={paths.support} component={Support}/>
      <Route exact path={paths.login} component={Login}/>
      <Route exact path={paths.register} component={Register}/>
      <Route exact path={paths.forgottenPassword} component={ForgottenPassword}/>
      <Route exact path={paths.maintenance} component={Maintenance}/>
      <Route component={Err404}/>
    </Switch>
  )
}