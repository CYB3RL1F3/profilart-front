import { client } from "./client";
import { getHeaders, getTokenHeader } from "./api";
import { AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL } from 'constants/user';
import { Store, CombinedState, AnyAction } from "redux";
import { AppState } from "reducers";


export const getSessionValidator = (store: Store<CombinedState<AppState>, AnyAction>) => 
  (session: any) => new Promise<boolean>((resolve, reject) => {
   
    setTimeout(async () => {
      // check if your session is still valid with a server check, through axios for instance
      if (!session.token) return reject();
      try {
        const response = await client.request({
          url: '/profile',
          method: 'get',
          headers: {
            ...getHeaders(),
            authorization: getTokenHeader(session.token)
          }
        });
        const { status, data } = response;
        console.log(status, data);
        if (status === 200 && data) {
          store.dispatch({
            type: AUTHENTICATE_SUCCESS,
            payload: {
              profile: data,
              authenticated: true,
              token: session.token
            }
          });
          return resolve(true);
        } else {
          store.dispatch({
            type: AUTHENTICATE_FAIL,
            payload: {
              profile: null,
              authenticated: false,
              token: null
            }
          });
          return reject();
        }
      } catch(e) {
        store.dispatch({
          type: AUTHENTICATE_FAIL,
          payload: {
            profile: null,
            authenticated: false,
            token: null
          }
        });
        return reject();
      }
      
    }, 100);
  }
)