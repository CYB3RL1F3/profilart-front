import { handleActions } from 'redux-actions';
import { CALL, CALL_SUCCESS, CALL_FAIL, CALL_CLOSE_ERROR, CALL_CLEAR } from 'constants/api';
import { AnyAction } from 'redux';
import { APIError } from 'types/Api';

export interface ApiReducer {
    url: string;
    result: Object | null;
    success: boolean;
    loading: boolean;
    error: APIError;
}

export const initialState: ApiReducer = {
    url: "",
    result: null,
    success: false,
    loading: false,
    error: null
};

export const apiReducer = handleActions({
  [CALL]: (state, { payload }: AnyAction) => ({
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
  })
}, initialState);

export default apiReducer;