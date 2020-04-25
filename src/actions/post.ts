import { GET_POSTS, CREATE, UPDATE, DELETE } from 'constants/post';
import { getHeaders } from 'utils/api';
import { CreateProfilePayload, UpdateProfilePayload } from 'types/Profile';

export const getPosts = (uid: string) => (
  {
    type: GET_POSTS,
    payload: {
      request:{
        url: `/${uid}/posts`,
        method: 'get',
        headers: getHeaders()
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