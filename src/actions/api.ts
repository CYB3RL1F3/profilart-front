import { getHeaders, toQuery } from 'utils/api';
import { CALL, CALL_CLOSE_ERROR, CALL_CLEAR, GET_STATUS } from 'constants/api';
import { Params } from 'types/Api';
import { createAction } from 'redux-actions';

export const call = <Arguments extends Params>(uid: string, method: string, args?: Arguments) => ({
  type: CALL,
  payload: {
    request:{
      url: `/${uid}/${method}${toQuery(args)}`,
      method: 'get',
      headers: getHeaders()
    }
  }
})

export const callUrl = (url: string) => ({
  type: CALL,
  payload: {
    request:{
      url,
      method: 'get',
      headers: getHeaders()
    }
  }
})

export const getStatus = () => ({
  type: GET_STATUS,
  payload: {
    request:{
      url: '/status',
      method: 'get',
      headers: getHeaders()
    }
  }
})

export const closeApiNotificationError = createAction(CALL_CLOSE_ERROR);

export const clear = createAction(CALL_CLEAR);