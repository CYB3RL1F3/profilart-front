import React, { FC, useMemo } from "react";
import { NotificationCenter } from 'types/Notifications';
import { Grid } from "components/atoms";
import { NotificationCenterComponent } from "components/molecules";
import {DataView} from 'primereact-working/dataview';

export interface NotificationCentersListProps {
  notificationCenters: () => NotificationCenter[];
}

export const NotificationCentersList: FC<NotificationCentersListProps> = ({ notificationCenters }) => {
  const data = useMemo(() => notificationCenters(), [notificationCenters]);
  const nbRows = useMemo(() => data.length, [data]);
  if (data.length) return (
    <Grid>
      <DataView
        value={data} 
        itemTemplate={NotificationCenterComponent}
        rows={nbRows}
        lazy
        emptyMessage="No notification centers yet !!"
      />
    </Grid>
  );
  return <p>No notification centers yet !!</p>;
}
export default NotificationCentersList;