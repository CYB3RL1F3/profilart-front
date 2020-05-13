/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from "react";
import { Grid } from "components/atoms";
import { GridCol } from "components/atoms/Grid";
import { Link } from "react-router-dom";

export const Err404: FC = () => {
  return (
    <div className="exception-body notfound">
      <div className="exception-panel">
          <div className="exception-code">
            <img src={require("style/images/exception/404.svg")} alt="error 500" />
          </div>
          <div className="exception-detail">
            <Grid>
                <GridCol>
                  <h1>Page not found!</h1>
                </GridCol>
                <GridCol>
                  <p>This page might not exists</p>
                </GridCol>
                <GridCol>
                  <p>
                    <Link to="/">Redirect to home page</Link>
                  </p>
                </GridCol>
                
            </Grid>
          </div>
      </div>
    </div>
  )
}

export default Err404;