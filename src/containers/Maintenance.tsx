/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from "react";
import { Grid } from "components/atoms";
import { GridCol } from "components/atoms/Grid";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from 'reducers';
import { Redirect } from "react-router-dom";
import { getStatus } from "actions/api";

export interface MaintenanceSelector {
  active: boolean;
  loading: boolean;
}

let hasTriggered = false;
export const Maintenance: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    hasTriggered = true;
    dispatch(getStatus());
  }, []);
  const { active, loading } = useSelector<AppState, MaintenanceSelector>(({ api }) => ({
    active: api.active,
    loading: api.loading
  }));
  if (active && !loading && hasTriggered) {
    return (
      <Redirect
        to="/login"
      />
    )
  }
  return (
    <div className="exception-body error">
      <div className="exception-panel">
          <div className="exception-code">
            <img src={require("style/images/exception/500.svg")} alt="error 500" />
          </div>
          <div className="exception-detail">
            <Grid>
                <GridCol>
                  <h1>Profilart is not available right now!</h1>
                </GridCol>
                <input type="hidden" value="something" />
                <GridCol>
                  <h3>The service is actually down.</h3> 
                  <br />
                  <p>Our team is actually hard working to restablish it as soon as possible. We're absolutely sorry for the inconveniance...</p>
                </GridCol>
                
            </Grid>
          </div>
      </div>
    </div>
  )
}

export default Maintenance;