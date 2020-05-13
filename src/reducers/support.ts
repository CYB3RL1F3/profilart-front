import { handleActions } from 'redux-actions';
import { AnyAction } from 'redux';
import { APIError } from 'types/Api';
import { CONTACT_SUPPORT, CONTACT_SUPPORT_SUCCESS, CONTACT_SUPPORT_FAIL, CONTACT_SUPPORT_CLOSE_ERROR } from 'constants/support';
import { CONTACT_SUPPORT_CLEAR } from 'constants/support';

export interface SupportReducer {
    success: boolean;
    loading: boolean;
    error: APIError;
}

export const initialState: SupportReducer = {
    success: false,
    loading: false,
    error: null,
};

export const apiReducer = handleActions({
  [CONTACT_SUPPORT]: () => ({
    success: false,
    loading: true,
    error: null
  }),
  [CONTACT_SUPPORT_SUCCESS]: () => ({
    success: true,
    loading: false,
    error: null
  }),
  [CONTACT_SUPPORT_FAIL]: (state, { error }: AnyAction) => ({
    success: false,
    loading: false,
    error
  }),
  [CONTACT_SUPPORT_CLOSE_ERROR]: (state) => ({
    ...state,
    error: null
  }),
  [CONTACT_SUPPORT_CLEAR]: (state) => ({
    ...state,
    success: false,
    error: null,
    loading: false
  })
}, initialState);

export default apiReducer;