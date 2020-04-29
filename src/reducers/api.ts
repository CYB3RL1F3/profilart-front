import { handleActions } from 'redux-actions';
import { CALL, CALL_SUCCESS, CALL_FAIL, CALL_CLOSE_ERROR, CALL_CLEAR } from 'constants/api';
import { AnyAction } from 'redux';

export interface ApiReducer {
    url: string;
    result: Object | null;
    success: boolean;
    loading: boolean;
    error: boolean;
}

export const initialState: ApiReducer = {
    url: "",
    result: null,
    success: false,
    loading: false,
    error: false
};

export const apiReducer = handleActions({
  [CALL]: (state, { payload }: AnyAction) => ({
    url: payload.request.url,
    result: null,
    success: false,
    loading: true,
    error: false
  }),
  [CALL_SUCCESS]: (state, { payload }: AnyAction) => ({
    ...state,
    result: payload,
    success: true,
    loading: false,
    error: false
  }),
  [CALL_FAIL]: (state, { error }: AnyAction) => ({
    ...state,
    result: null,
    success: false,
    loading: false,
    error: error
  }),
  [CALL_CLEAR]: (state) => ({
    ...state,
    url: "",
    result: null
  }),
  [CALL_CLOSE_ERROR]: (state) => ({
    ...state,
    error: false
  })
}, initialState);

export default apiReducer;