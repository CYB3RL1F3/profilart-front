import React, { FC } from "react";
import Grid from "components/atoms/Grid";

export const LoadingPosts: FC = () => (
  <Grid>
    <h3>Please wait, we're pulling your posts... <span className="pi pi-spin pi-spinner" /></h3>
  </Grid>
);

export default LoadingPosts;