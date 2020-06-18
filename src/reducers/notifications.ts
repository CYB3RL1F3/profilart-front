import { handleActions } from 'redux-actions';
import { NotificationCenterReducer } from 'types/Notifications';
import { NOTIFY, NOTIFY_SUCCESS, NOTIFY_FAIL, CREATE_NOTIFICATION_CENTER, CREATE_NOTIFICATION_CENTER_SUCCESS, CREATE_NOTIFICATION_CENTER_FAIL, UPDATE_NOTIFICATION_CENTER, UPDATE_NOTIFICATION_CENTER_SUCCESS, UPDATE_NOTIFICATION_CENTER_FAIL, GET_NOTIFICATION_CENTERS, GET_NOTIFICATION_CENTERS_SUCCESS, GET_NOTIFICATION_CENTERS_FAIL, CLOSE_NOTIFICATION_CENTERS_NOTIF, MODAL_OPEN, MODAL_CLOSE, DELETE_NOTIFICATION_CENTER, DELETE_NOTIFICATION_CENTER_SUCCESS, DELETE_NOTIFICATION_CENTER_FAIL, PUSH_NOTIFICATION_MODAL_OPEN, PUSH_NOTIFICATION_MODAL_CLOSE } from '../constants/notification';
import { CLOSE_NOTIFICATION_CENTERS_ERROR } from 'constants/notification';
import { AnyAction } from 'redux';

export const initialState: NotificationCenterReducer = {
  loading: false,
  addSuccess: false,
  success: false,
  updateSuccess: false,
  notifySuccess: false,
  deleteSuccess: false,
  notificationCenters: [],
  error: null,
  modal: {
    opened: false,
    new: false,
    id: null
  },
  notificationModal: {
    opened: false,
    id: null
  }
}

export const notificationsReducer = handleActions({
  [GET_NOTIFICATION_CENTERS]: (state) => ({
    ...state,
    success: false,
    updateSuccess: false,
    notifySuccess: false,
    addSuccess: false,
    error: null,
    loading: true
  }),
  [GET_NOTIFICATION_CENTERS_SUCCESS]: (state, { payload }: any) => ({
    ...state,
    notificationCenters: payload,
    success: true,
    error: null,
    loading: false
  }),
  [GET_NOTIFICATION_CENTERS_FAIL]: (state, { error }: any) => ({
    ...state,
    error,
    success: false,
    loading: false
  }),
  [NOTIFY]: (state) => ({
    ...state,
    updateSuccess: false,
    notifySuccess: false,
    addSuccess: false,
    error: null,
    loading: true
  }),
  [NOTIFY_SUCCESS]: (state) => ({
    ...state,
    notifySuccess: true,
    error: null,
    loading: false
  }),
  [NOTIFY_FAIL]: (state, { error }: any) => ({
    ...state,
    error,
    notifySuccess: false,
    loading: false
  }),
  [CREATE_NOTIFICATION_CENTER]: (state) => ({
    ...state,
    updateSuccess: false,
    notifySuccess: false,
    addSuccess: false,
    error: null,
    loading: true
  }),
  [CREATE_NOTIFICATION_CENTER_SUCCESS]: (state, { payload }: any) => ({
    ...state,
    notificationCenters: payload,
    addSuccess: true,
    error: null,
    loading: false,
    modal: initialState.modal
  }),
  [CREATE_NOTIFICATION_CENTER_FAIL]: (state, { error }: any) => ({
    ...state,
    error,
    addSuccess: false,
    loading: false
  }),
  [UPDATE_NOTIFICATION_CENTER]: (state) => ({
    ...state,
    updateSuccess: false,
    notifySuccess: false,
    addSuccess: false,
    error: null,
    loading: true
  }),
  [UPDATE_NOTIFICATION_CENTER_SUCCESS]: (state, { payload }: any) => ({
    ...state,
    notificationCenters: payload,
    updateSuccess: true,
    error: null,
    loading: false,
    modal: initialState.modal
  }),
  [UPDATE_NOTIFICATION_CENTER_FAIL]: (state, { error }: any) => ({
    ...state,
    error,
    updateSuccess: false,
    loading: false
  }),
  [DELETE_NOTIFICATION_CENTER]: (state) => ({
    ...state,
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    loading: true,
    error: null
  }),
  [DELETE_NOTIFICATION_CENTER_SUCCESS]: (state, { payload }: AnyAction) => ({
    ...state,
    notificationCenters: payload,
    deleteSuccess: true,
    addSuccess: false,
    updateSuccess: false,
    loading: false,
    error: null
  }),
  [DELETE_NOTIFICATION_CENTER_FAIL]: (state, { error }: AnyAction) => ({
    ...state,
    error,
    deleteSuccess: false,
    addSuccess: false,
    updateSuccess: false,
    loading: false
  }),
  [CLOSE_NOTIFICATION_CENTERS_ERROR]: (state) => ({
    ...state,
    error: null
  }),
  [CLOSE_NOTIFICATION_CENTERS_NOTIF]: (state) => ({
    ...state,
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
  }),
  [MODAL_OPEN]: (state, { payload }: AnyAction) => ({
    ...state,
    modal: {
      opened: true,
      new: payload.isNew,
      id: payload.id
    }
  }),
  [MODAL_CLOSE]: (state) => ({
    ...state,
    modal: initialState.modal
  }),
  [PUSH_NOTIFICATION_MODAL_OPEN]: (state, { payload }: AnyAction) => ({
    ...state,
    notificationModal: {
      opened: true,
      id: payload.id
    }
  }),
  [PUSH_NOTIFICATION_MODAL_CLOSE]: (state) => ({
    ...state,
    notificationModal: {
      opened: false,
      id: null
    }
  })
}, initialState);

export default notificationsReducer;