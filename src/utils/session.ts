import { client } from "./client";
import { getHeaders, getTokenHeader } from "./api";
import { AUTHENTICATE_SUCCESS } from 'constants/user';
import { Store, CombinedState, AnyAction } from "redux";
import { AppState } from "reducers";


export const getSessionValidator = (store: Store<CombinedState<AppState>, AnyAction>) => (session: any) => new Promise<boolean>(async (resolve, reject) => {
  console.log(session);
  // check if your session is still valid with a server check, through axios for instance
  if (!session.token) return reject();
  const response = await client.request({
    url: '/profile',
    method: 'get',
    headers: {
      ...getHeaders(),
      authorization: getTokenHeader(session.token)
    }
  });
  const { status, data } = response;
  if (status === 200 && data) {
    store.dispatch({
      type: AUTHENTICATE_SUCCESS,
      payload: data
    });
    return resolve(true);
  } else {
    return reject();
  }
})