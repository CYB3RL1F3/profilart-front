import { handleActions } from 'redux-actions';
import { Profile } from 'types/Profile';
import { AUTHENTICATE, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL, UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAIL, DISCONNECT, GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL, CLOSE_USER_UPDATE_NOTIF, CLOSE_USER_DELETE_NOTIF, CLOSE_USER_ERROR_NOTIF, CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL, CLOSE_USER_CREATE_NOTIF } from 'constants/user';
import { AnyAction } from 'redux';

export interface UserReducer {
  loading: boolean;
  error: boolean | undefined;
  authenticated: boolean;
  profile: Profile | null;
  created: boolean;
  updated: boolean;
  deleted: boolean;
  token: string | null;
}

export const initialState: UserReducer = {
      loading: false,
      error: false,
      authenticated: false,
      token: null,
      profile: null,
      updated: false,
      deleted: false,
      created: false
  }

export const userReducer = handleActions(
  {
    [AUTHENTICATE]: (state) => ({
      ...state,
      profile: null,
      authenticated: false,
      error: false,
      loading: true,
      token: null
    }),
    [AUTHENTICATE_SUCCESS]: (state, { payload }) => ({
      ...state,
      profile: payload.profile,
      authenticated: payload.authenticated,
      error: false,
      loading: false,
      token: payload.token
    }),
    [AUTHENTICATE_FAIL]: (state, { error }) => ({
      ...state,
      error,
      profile: null,
      authenticated: false,
      loading: false
    }),
    [GET_PROFILE]: (state) => ({
      ...state,
      profile: null,
      authenticated: false,
      error: false,
      loading: true,
      token: null
    }),
    [GET_PROFILE_SUCCESS]: (state, { payload }: AnyAction) => ({
      ...state,
      profile: payload,
      error: false,
      loading: false
    }),
    [GET_PROFILE_FAIL]: (state, { error }) => ({
      ...state,
      error,
      profile: null,
      loading: false
    }),
    [CREATE_USER]: (state) => ({
      ...state,
      error: false,
      loading: true,
      created: false
    }),
    [CREATE_USER_SUCCESS]: (state, { payload }: AnyAction) => ({
      ...state,
      profile: payload,
      error: false,
      loading: false,
      created: true
    }),
    [CREATE_USER_FAIL]: (state, { error }) => ({
      ...state,
      error,
      loading: false,
      created: false
    }),
    [UPDATE_USER]: (state) => ({
      ...state,
      error: false,
      loading: true,
      updated: false
    }),
    [UPDATE_USER_SUCCESS]: (state, { payload }: AnyAction) => ({
      ...state,
      profile: payload,
      error: false,
      loading: false,
      updated: true
    }),
    [UPDATE_USER_FAIL]: (state, { error }) => ({
      ...state,
      error,
      loading: false,
      updated: false
    }),
    [DELETE_USER]: (state) => ({
      ...state,
      error: false,
      loading: true,
      deleted: false
    }),
    [DELETE_USER_SUCCESS]: (state) => ({
      ...state,
      profile: null,
      error: false,
      loading: false,
      deleted: true
    }),
    [DELETE_USER_FAIL]: (state, { error }) => ({
      ...state,
      error,
      loading: false,
      deleted: false
    }),
    [DISCONNECT]: (state) => ({
      ...state,
      error: false,
      profile: null,
      authenticated: false,
      loading: false
    }),
    [CLOSE_USER_CREATE_NOTIF]: (state) => ({
      ...state,
      created: false
    }),
    [CLOSE_USER_UPDATE_NOTIF]: (state) => ({
      ...state,
      updated: false
    }),
    [CLOSE_USER_DELETE_NOTIF]: (state) => ({
      ...state,
      deleted: false
    }),
    [CLOSE_USER_ERROR_NOTIF]: (state) => ({
      ...state,
      error: false
    })
  },
  initialState
);

export default userReducer;
