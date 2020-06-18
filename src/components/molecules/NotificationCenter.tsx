import React, { useCallback, FC } from "react";
import { NotificationCenter } from 'types/Notifications';
import { Grid, GridCol12 } from 'components/atoms/Grid';
import { PostActionsBar } from "components/atoms";
import { useDispatch } from "react-redux";
import { deleteNotificationCenter, openNotifModal, openNotificationModal } from "actions/notifications";
import { Button } from "primereact-working/button";

interface NotificationCenterElementProps {
  notificationCenter: NotificationCenter;
}

const NotificationCenterElement: FC<NotificationCenterElementProps> = ({ notificationCenter }) => {
  const dispatch = useDispatch();

  const deleteNotificationCenterAction = useCallback(() => {
    dispatch(deleteNotificationCenter(notificationCenter.id));
  }, [dispatch, notificationCenter.id]);


  const sendNotification = useCallback(() => {
    dispatch(openNotificationModal(notificationCenter.id));
  }, [dispatch, notificationCenter.id]);

  const editNotificationCenterAction = useCallback(() => {
    dispatch(openNotifModal(notificationCenter.id));
  }, [dispatch, notificationCenter.id]);
  return (
      <Grid>
        <GridCol12 className="notificationCenter">
          <h3>
            {notificationCenter.website}
          </h3>
          <div className="content_notificationCenter">
            <ul>
              <li><b>ID:</b> {notificationCenter.id}</li>
              <li><b>Account email:</b> {notificationCenter.email}</li>
              <li><b>Firebase key:</b> {notificationCenter.gcmApiKey}</li>
              <li><b>Public key:</b> {notificationCenter.publicKey}</li>
              <li><b>Private key:</b> {notificationCenter.privateKey}</li>
              <li><b>{notificationCenter.subscriptions.length} subscriptions</b> / <b>{notificationCenter.notifications.length} notifications</b></li>
            </ul>
          </div>
        </GridCol12>
        <GridCol12 className="picture">
          <div className="actions notify">
            <Button onClick={sendNotification} label={"Send a notification"} />
            <PostActionsBar onDelete={deleteNotificationCenterAction} onEdit={editNotificationCenterAction} />
          </div>
        </GridCol12>
      </Grid>
  );
}

export const NotificationCenterComponent = (notificationCenter: NotificationCenter) => <NotificationCenterElement notificationCenter={notificationCenter} />
export default NotificationCenterComponent;