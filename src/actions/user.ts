import { AUTHENTICATE, GET_PROFILE, CREATE_USER, UPDATE_USER, DELETE_USER, DISCONNECT, CLOSE_USER_CREATE_NOTIF, CLOSE_USER_DELETE_NOTIF, CLOSE_USER_ERROR_NOTIF, RECOVER_PASSWORD } from 'constants/user';
import { getHeaders } from 'utils/api';
import { CreateProfilePayload, Credentials, UpdateProfilePayload } from 'types/Profile';
import { sessionService } from 'redux-react-session';
import store from "store";
import { createAction } from 'redux-actions';
import { CLOSE_USER_UPDATE_NOTIF, CLOSE_USER_FORGOTTEN_PASSWORD_NOTIF } from '../constants/user';

export const authenticate = (credentials: Credentials) => (
  {
    type: AUTHENTICATE,
    payload: {
      request: {
        url:'/login',
        method: 'post',
        headers: getHeaders(),
        data: JSON.stringify(credentials)
      }
    }
  }
)

export const recoverPassword = (email: string) => (
  {
    type: RECOVER_PASSWORD,
    payload: {
      request: {
        url:'/password',
        method: 'patch',
        headers: getHeaders(),
        data: JSON.stringify({
          email
        })
      }
    }
  }
)


export const disconnect = createAction(DISCONNECT);

export const logout = async () => {
  await sessionService.deleteSession();
  store.dispatch(disconnect());
}

export const getProfile = () => (
  {
    type: GET_PROFILE,
    payload: {
      request:{
        url:'/profile',
        method: 'get',
        headers: getHeaders(true)
      }
    }
  }
)

export const createProfile = (profile: CreateProfilePayload) => (
  {
    type: CREATE_USER,
    payload: {
      request:{
        url:'/create',
        method: 'post',
        headers: getHeaders(),
        data: JSON.stringify(profile)
      }
    }
  }
)

export const updateProfile = (profile: UpdateProfilePayload) => (
  {
    type: UPDATE_USER,
    payload: {
      request:{
        url:'/profile',
        method: 'patch',
        headers: getHeaders(true),
        data: JSON.stringify(profile)
      }
    }
  }
)

export const clearProfile = () => (
  {
    type: DELETE_USER,
    payload: {
      request:{
        url: `/profile`,
        method: 'delete',
        headers: getHeaders(true)
      }
    }
  }
)


export const deleteProfile = async () => {
  await sessionService.deleteSession();
  store.dispatch(clearProfile());
}

export const closeCreateNotification = createAction(CLOSE_USER_CREATE_NOTIF);

export const closeUpdateNotification = createAction(CLOSE_USER_UPDATE_NOTIF);

export const closeDeleteNotification = createAction(CLOSE_USER_DELETE_NOTIF);

export const closeErrorNotification = createAction(CLOSE_USER_ERROR_NOTIF);

export const closeForgottenPasswordNotification = createAction(CLOSE_USER_FORGOTTEN_PASSWORD_NOTIF);
