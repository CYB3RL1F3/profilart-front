import React, { FC } from "react";
import { PageLayout } from "components/layouts/PageLayout";
import { Grid } from "components/atoms";
import { GridCol12, GridCol6 } from "components/atoms/Grid";
import { Button } from "primereact-working/button";

export const Notification: FC = () => {
  
  return (
    <PageLayout className="postsPage">
        <Grid>
          <GridCol12 className="p-grid">
            <GridCol6>
              <h1>Notifications Center</h1>
            </GridCol6>
            <GridCol6 className="button_handler">
              <Button label="Add notification center" icon="pi pi-plus" />
            </GridCol6>
          </GridCol12>
        </Grid>
      </PageLayout>
      
  );
}

export default Notification;