import React, { FC, lazy, Suspense, useCallback, useMemo } from "react";
import { PageLayout } from "components/layouts/PageLayout";
import { Grid } from "components/atoms";
import { GridCol12, GridCol6 } from "components/atoms/Grid";
import { Button } from "primereact-working/button";
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'reducers';
import { NotificationCenterReducer } from "types/Notifications";
import { getNotificationCenters, openNotifModal } from "actions/notifications";
import Message, { MessageType } from "components/atoms/Message";
import { Footer, LoadingPosts } from "components/molecules";
import { closeNotifModal } from '../actions/notifications';
import { NotificationCenterForm } from 'components/templates/NotificationCenterForm';
import { NotifyForm } from "components/templates/NotifyForm";

const NotificationCentersList = lazy(() => import('../components/templates/NotificationCentersList'));

export const Notification: FC = () => {

  const { loading, error, notificationCenters, addSuccess, updateSuccess, deleteSuccess, modal, notificationModal } = useSelector<AppState, NotificationCenterReducer>(({ notifications }) => notifications);
  const dispatch = useDispatch();
 
  const openForm = useCallback(() => {
    console.log('passs');
    dispatch(openNotifModal(null));
  }, [dispatch]);

  const closeMessage = useCallback(() => {
    dispatch(closeNotifModal());
  }, [dispatch]);

  const closeErrorNotif = useCallback(() => {
    dispatch(closeNotifModal());
  }, [dispatch]);

  const promise = useMemo(() => dispatch(getNotificationCenters()), [dispatch]);

  const getFetchedNotificationCenters = useCallback(() => {
    if (loading || !notificationCenters) {
      throw promise;
    }
    return notificationCenters;
  }, [notificationCenters, loading, promise]);

  return (
    <>
    <PageLayout className="postsPage">
        <Grid>
          <GridCol12 className="p-grid">
            <GridCol6>
              <h1>Notifications Center</h1>
            </GridCol6>
            <GridCol6 className="button_handler">
              <Button onClick={openForm} label="Add notification center" icon="pi pi-plus" />
            </GridCol6>
          </GridCol12>
        </Grid>
        <Grid className="messages">
          <p>Additionnaly to data from popular APIs, you can manage notifications for your website or apps.</p><br />
        </Grid>
        
        <Grid className="messages">
          {addSuccess && (
            <Message onClose={closeMessage} type={MessageType.success} summary="Notification center successfully added!" />
          )}
          {updateSuccess && (
            <Message onClose={closeMessage} type={MessageType.success} summary="Notification center successfully updated!" />
          )}
          {deleteSuccess && (
            <Message onClose={closeMessage} type={MessageType.success} summary="Notification center successfully deleted!" />
          )}
          {error && !modal.opened && (
            <Message onClose={closeErrorNotif} type={MessageType.error} summary="A fatal exception occured!" details={error.message} />
          )}
        </Grid>

        <Grid className="button_handler_mobile">
          <GridCol12>
            <Button onClick={openForm} label="Add notification center" icon="pi pi-plus" />
          </GridCol12>
        </Grid>
        <Grid className="postlistcontent">
          <Suspense fallback={<LoadingPosts />}>
            <NotificationCentersList notificationCenters={getFetchedNotificationCenters} />
          </Suspense>
        </Grid>
        
        <Footer />
      </PageLayout>

      {modal.opened && (<NotificationCenterForm />)}
      {notificationModal.opened && (<NotifyForm />)}
      </>
  );
}

export default Notification;