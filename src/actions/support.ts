import { CONTACT_SUPPORT, CONTACT_SUPPORT_CLOSE_ERROR, CONTACT_SUPPORT_CLEAR } from "constants/support";
import { getHeaders } from "utils/api";
import { createAction } from 'redux-actions';

export interface SupportContact {
  question: string;
  content: string;
  email: string;
  name: string;
}

export const contactSupport = (informations: SupportContact) => (
  {
    type: CONTACT_SUPPORT,
    payload: {
      request: {
        url:'/support',
        method: 'post',
        headers: getHeaders(),
        data: JSON.stringify({
          ...informations
        })
      }
    }
  }
)

export const closeErrorSupport = createAction(CONTACT_SUPPORT_CLOSE_ERROR);
export const closeSuccessSupport = createAction(CONTACT_SUPPORT_CLEAR);
