import { handleActions } from 'redux-actions';
import { CALL, CALL_SUCCESS, CALL_FAIL, CALL_CLOSE_ERROR, CALL_CLEAR, GET_STATUS, GET_STATUS_FAIL, REFETCH, REFETCH_SUCCESS, REFETCH_FAIL } from 'constants/api';
import { AnyAction } from 'redux';
import { APIError } from 'types/Api';
import { GET_STATUS_SUCCESS } from '../constants/api';

export interface ApiReducer {
    url: string;
    result: Object | null;
    success: boolean;
    loading: boolean;
    error: APIError;
    active: boolean;
    successRefetch: boolean;
}

export const initialState: ApiReducer = {
    url: "",
    result: null,
    success: false,
    loading: false,
    error: null,
    active: true,
    successRefetch: false
};

export const apiReducer = handleActions({
  [CALL]: (state, { payload }: AnyAction) => ({
    ...state,
    url: payload.request.url,
    result: null,
    success: false,
    loading: true,
    error: null
  }),
  [CALL_SUCCESS]: (state, { payload }: AnyAction) => ({
    ...state,
    result: payload,
    success: true,
    loading: false,
    error: null
  }),
  [CALL_FAIL]: (state, { error }: AnyAction) => ({
    ...state,
    result: null,
    success: false,
    loading: false,
    error
  }),
  [CALL_CLEAR]: (state) => ({
    ...state,
    url: "",
    result: null
  }),
  [CALL_CLOSE_ERROR]: (state) => ({
    ...state,
    error: null
  }),
  [GET_STATUS]: (state) => ({
    ...state,
    loading: true
  }),
  [GET_STATUS_SUCCESS]: (state, { payload }: AnyAction) => ({
    ...state,
    loading: false,
    active: payload.active
  }),
  [GET_STATUS_FAIL]: (state) => ({
    ...state,
    loading: false,
    active: false
  }),
  [REFETCH]: (state, { payload }: AnyAction) => ({
    ...state,
    successRefetch: false,
    loading: true,
    error: null
  }),
  [REFETCH_SUCCESS]: (state, { payload }: AnyAction) => ({
    ...state,
    loading: false,
    successRefetch: true,
    error: null
  }),
  [REFETCH_FAIL]: (state, { error }: AnyAction) => ({
    ...state,
    error,
    loading: false,
    successRefetch: false
  }),
}, initialState);

export default apiReducer;