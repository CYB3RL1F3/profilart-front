import { handleActions } from 'redux-actions';
import { GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAIL, UPDATE_POST, UPDATE_POST_FAIL, UPDATE_POST_SUCCESS, CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAIL, DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAIL } from 'constants/post';
import { Post } from 'types/Posts';
import { AnyAction } from 'redux';

export interface PostsReducer {
    posts: Post[];
    success: boolean;
    loading: boolean;
    error: boolean | undefined;
}

export const initialState: PostsReducer = {
    posts: [],
    success: false,
    loading: false,
    error: false
};

export const apiReducer = handleActions({
  [GET_POSTS]: () => ({
    posts: [],
    success: false,
    loading: true,
    error: false
  }),
  [GET_POSTS_SUCCESS]: (state, { payload }: AnyAction) => ({
    posts: payload,
    success: true,
    loading: false,
    error: false
  }),
  [GET_POSTS_FAIL]: (state, { error }) => ({
    error,
    posts: [],
    success: false,
    loading: false
  }),
  [CREATE_POST]: (state) => ({
    posts: state.posts,
    success: false,
    loading: true,
    error: false
  }),
  [CREATE_POST_SUCCESS]: (state, { payload }: AnyAction) => ({
    posts: [
      ...state.posts,
      payload
    ],
    success: true,
    loading: false,
    error: false
  }),
  [CREATE_POST_FAIL]: (state, { error }) => ({
    ...state,
    error,
    success: false,
    loading: false
  }),
  [UPDATE_POST]: (state) => ({
    posts: state.posts,
    success: false,
    loading: true,
    error: false
  }),
  [UPDATE_POST_SUCCESS]: (state, { payload }: AnyAction) => ({
      posts: state.posts.map(p => p._id === payload._id ? payload : p),
      success: true,
      loading: false,
      error: false
    }),
  [UPDATE_POST_FAIL]: (state, { error }) => ({
    ...state,
    error,
    success: false,
    loading: false
  }),
  [DELETE_POST]: (state) => ({
    posts: state.posts,
    success: false,
    loading: true,
    error: false
  }),
  [DELETE_POST_SUCCESS]: (state, { payload }: AnyAction) => {
    return {
      posts: state.posts.filter(p => p._id !== payload.id),
      success: true,
      loading: false,
      error: false
    }
  },
  [DELETE_POST_FAIL]: (state, { error }) => ({
    ...state,
    error,
    success: false,
    loading: false
  })
}, initialState);

export default apiReducer;