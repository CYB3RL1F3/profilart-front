import { handleActions } from 'redux-actions';
import { CALL, CALL_SUCCESS, CALL_FAIL } from 'constants/api';

export interface ApiReducer {
    result: Object | null;
    success: boolean;
    loading: boolean;
    error: string | null;
}

export const initialState: ApiReducer = {
    result: null,
    success: false,
    loading: false,
    error: null
};

export const apiReducer = handleActions({
  [CALL]: () => ({
    result: null,
    success: false,
    loading: true,
    error: null
  }),
  [CALL_SUCCESS]: (state, { payload }) => ({
    result: payload.result,
    success: true,
    loading: false,
    error: null
  }),
  [CALL_FAIL]: (state, { payload }) => ({
    result: null,
    success: false,
    loading: false,
    error: payload.error
  })
}, initialState);

export default apiReducer;