import { handleActions } from 'redux-actions';
import { Profile } from 'types/Profile';
import { AUTHENTICATE, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL, UPDATE, UPDATE_SUCCESS, UPDATE_FAIL, DELETE, DELETE_SUCCESS, DELETE_FAIL, DISCONNECT, GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL } from 'constants/user';
import { AnyAction } from 'redux';

export interface UserReducer {
  loading: boolean;
  error: boolean | undefined;
  authenticated: boolean | null;
  profile: Profile | null;
  updated: boolean | null;
  deleted: boolean | null;
  token: string | null;
}

export const initialState: UserReducer = {
      loading: false,
      error: false,
      authenticated: null,
      token: null,
      profile: null,
      updated: false,
      deleted: false,
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
    [UPDATE]: (state) => ({
      ...state,
      error: false,
      loading: true,
      updated: false
    }),
    [UPDATE_SUCCESS]: (state, { payload }) => ({
      ...state,
      profile: payload.profile,
      error: false,
      loading: false,
      updated: true
    }),
    [UPDATE_FAIL]: (state, { payload }) => ({
      ...state,
      error: payload.error,
      loading: false,
      updated: false
    }),
    [DELETE]: (state) => ({
      ...state,
      error: false,
      loading: true,
      deleted: false
    }),
    [DELETE_SUCCESS]: (state, { payload }) => ({
      ...state,
      profile: null,
      error: false,
      loading: false,
      deleted: true
    }),
    [DELETE_FAIL]: (state, { payload }) => ({
      ...state,
      error: payload.error,
      loading: false,
      deleted: false
    }),
    [DISCONNECT]: (state) => ({
      ...state,
      error: false,
      profile: null,
      authenticated: false,
      loading: false
    })
  },
  initialState
);

export default userReducer;
