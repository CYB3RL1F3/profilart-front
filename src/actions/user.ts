import { AUTHENTICATE, GET_PROFILE, CREATE, UPDATE, DELETE } from 'constants/user';
import { getHeaders } from 'utils/api';
import { CreateProfilePayload, Credentials, UpdateProfilePayload } from 'types/Profile';

export const authenticate = (credentials: Credentials) => (
  {
    type: AUTHENTICATE,
    payload: {
      request: {
        url:'/login',
        method: 'post',
        headers: getHeaders(),
        data: JSON.stringify(credentials)
      }
    }
  }
)

export const getProfile = () => (
  {
    type: GET_PROFILE,
    payload: {
      request:{
        url:'/profile',
        method: 'get',
        headers: getHeaders(true)
      }
    }
  }
)

export const createProfile = (profile: CreateProfilePayload) => (
  {
    type: CREATE,
    payload: {
      request:{
        url:'/profile',
        method: 'post',
        headers: getHeaders(),
        data: JSON.stringify(profile)
      }
    }
  }
)

export const updateProfile = (profile: UpdateProfilePayload) => (
  {
    type: UPDATE,
    payload: {
      request:{
        url:'/profile',
        method: 'patch',
        headers: getHeaders(true),
        data: JSON.stringify(profile)
      }
    }
  }
)

export const deleteProfile = (uid: string) => (
  {
    type: DELETE,
    payload: {
      request:{
        url: `/profile/${uid}`,
        method: 'delete',
        headers: getHeaders(true)
      }
    }
  }
)