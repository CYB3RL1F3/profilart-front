import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from 'constants/post';
import { getHeaders } from 'utils/api';
import { CreatePost, UpdatePost } from 'types/Posts';

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

export const createPost = (profile: CreatePost) => (
  {
    type: CREATE_POST,
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

export const updatePost = (profile: UpdatePost) => (
  {
    type: UPDATE_POST,
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

export const deletePost = (uid: string) => (
  {
    type: DELETE_POST,
    payload: {
      request:{
        url: `/profile/${uid}`,
        method: 'delete',
        headers: getHeaders(true)
      }
    }
  }
)