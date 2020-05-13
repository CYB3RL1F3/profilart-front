import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, MODAL_OPEN, MODAL_CLOSE, CLOSE_POSTS_NOTIF, CLOSE_POSTS_ERROR } from 'constants/post';
import { getHeaders, toBase64 } from 'utils/api';
import { CreatePost, UpdatePost } from 'types/Posts';
import { createAction } from 'redux-actions';
import axios from 'axios';
import { config } from 'config';

export const closeFormModal = createAction(MODAL_CLOSE);

export const closePostNotif = createAction(CLOSE_POSTS_NOTIF);

export const closeErrorNotif = createAction(CLOSE_POSTS_ERROR);

export const openFormModal = createAction(MODAL_OPEN, (postId: string | null) => ({
  isNew: !!postId,
  postId
}))

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

export const createPost = (post: CreatePost) => (
  {
    type: CREATE_POST,
    payload: {
      request:{
        url:'/posts',
        method: 'post',
        headers: getHeaders(true),
        data: JSON.stringify(post)
      }
    }
  }
)

export const updatePost = (post: UpdatePost) => (
  {
    type: UPDATE_POST,
    payload: {
      request:{
        url:'/posts',
        method: 'patch',
        headers: getHeaders(true),
        data: JSON.stringify(post)
      }
    }
  }
)

export const deletePost = (id: string) => (
  {
    type: DELETE_POST,
    payload: {
      request:{
        url: `/posts/${id}`,
        method: 'delete',
        headers: getHeaders(true)
      }
    }
  }
)

export const uploadPic = async (file: any) => {
  const fd = new FormData();
  const blob = await toBase64(file);
  fd.append('cloud_name', config.cloud.cloud_name);
  fd.append('api_key', config.cloud.api_key);
  fd.append('api_secret', config.cloud.api_secret);
  fd.append('upload_preset', config.cloud.preset);
  fd.append('file', blob);
  const instance = axios.create({
    baseURL: config.cloud.url,
  });
  const res = await instance.post("/image/upload", fd, {
    headers: {
      'Content-Type': 'image/png',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
  return res;
}

export const togglePublish = ({ id, post }: UpdatePost) => (
  {
    type: UPDATE_POST,
    payload: {
      request:{
        url:'/posts',
        method: 'patch',
        headers: getHeaders(true),
        data: JSON.stringify({
          id,
          post: {
            ...post,
            published: !post.published
          }
        })
      }
    }
  }
);
