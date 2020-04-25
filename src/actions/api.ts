import { getHeaders, toQuery } from 'utils/api';
import { CALL } from '../constants/api';
import { Params } from 'types/Api';

export const call = <Arguments extends Params>(uid: string, method: string, args: Arguments) => ({
  type: CALL,
  payload: {
    request:{
      url: `/${uid}/${method}?${toQuery(args)}`,
      method: 'get',
      headers: getHeaders()
    }
  }
})