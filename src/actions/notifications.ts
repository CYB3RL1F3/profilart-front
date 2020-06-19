import { getHeaders } from "utils/api"
import { NOTIFY, GET_NOTIFICATION_CENTERS, CREATE_NOTIFICATION_CENTER, UPDATE_NOTIFICATION_CENTER, MODAL_OPEN, MODAL_CLOSE, CLOSE_NOTIFICATION_CENTERS_NOTIF, CLOSE_NOTIFICATION_CENTERS_ERROR, DELETE_NOTIFICATION_CENTER, PUSH_NOTIFICATION_MODAL_OPEN, PUSH_NOTIFICATION_MODAL_CLOSE } from "constants/notification"
import { NotificationCenterArgs, NotificationArgs } from "types/Notifications"
import { createAction } from "redux-actions"


export const getNotificationCenters = () => (
  {
    type: GET_NOTIFICATION_CENTERS,
    payload: {
      request:{
        url: `/notificationCenters`,
        method: 'get',
        headers: getHeaders(true)
      }
    }
  }
)

export const createNotificationCenter = (notificationCenter: NotificationCenterArgs) => (
  {
    type: CREATE_NOTIFICATION_CENTER,
    payload: {
      request:{
        url:'/notificationCenter',
        method: 'post',
        headers: getHeaders(true),
        data: JSON.stringify(notificationCenter)
      }
    }
  }
)

export const updateNotificationCenter = (notificationCenter: NotificationCenterArgs) => (
  {
    type: UPDATE_NOTIFICATION_CENTER,
    payload: {
      request:{
        url:'/notificationCenter',
        method: 'patch',
        headers: getHeaders(true),
        data: JSON.stringify(notificationCenter)
      }
    }
  }
)

export const deleteNotificationCenter = (id: string) => (
  {
    type: DELETE_NOTIFICATION_CENTER,
    payload: {
      request:{
        url: `/notificationCenters/${id}`,
        method: 'delete',
        headers: getHeaders(true)
      }
    }
  }
)

export const notify = (notification: NotificationArgs) => (
  {
    type: NOTIFY,
    payload: {
      request:{
        url:'/notify',
        method: 'post',
        headers: getHeaders(true),
        data: JSON.stringify(notification)
      }
    }
  }
)
// PUSH_NOTIFICATION_MODAL_OPEN
export const closeNotifModal = createAction(MODAL_CLOSE);

export const closeNotificationCenterNotif = createAction(CLOSE_NOTIFICATION_CENTERS_NOTIF);

export const closeNotificationCenterErrorNotif = createAction(CLOSE_NOTIFICATION_CENTERS_ERROR);

export const openNotifModal = createAction(MODAL_OPEN, (id: string | null | undefined) => ({
  isNew: !!id,
  id
}))

export const openNotificationModal = createAction(PUSH_NOTIFICATION_MODAL_OPEN, (id: string | null | undefined) => ({
  id
}))

export const closeNotificationModal = createAction(PUSH_NOTIFICATION_MODAL_CLOSE);
