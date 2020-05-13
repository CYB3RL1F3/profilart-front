import { handleActions } from 'redux-actions';
import { GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAIL, UPDATE_POST, UPDATE_POST_FAIL, UPDATE_POST_SUCCESS, CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAIL, DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAIL, MODAL_OPEN, MODAL_CLOSE, CLOSE_POSTS_NOTIF, CLOSE_POSTS_ERROR } from 'constants/post';
import { Post } from 'types/Posts';
import { AnyAction } from 'redux';
import { APIError } from 'types/Api';

export interface PostsReducer {
  posts: Post[];
  addSuccess: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
  loading: boolean;
  error: APIError;
  modal: {
    opened: boolean;
    new: boolean;
    postId: string | null;
  }
}

export const initialState: PostsReducer = {
  posts: [],
  addSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
  loading: false,
  error: null,
  modal: {
    opened: false,
    new: false,
    postId: null
  }
};

export const postsReducer = handleActions({
  [GET_POSTS]: (state) => ({
    ...state,
    posts: [],
    addSuccess: false,
    loading: true,
    error: null
  }),
  [GET_POSTS_SUCCESS]: (state, { payload }: AnyAction) => ({
    ...state,
    posts: payload,
    loading: false,
    error: null
  }),
  [GET_POSTS_FAIL]: (state, { error }: AnyAction) => ({
    ...state,
    error,
    posts: [],
    addSuccess: false,
    loading: false
  }),
  [CREATE_POST]: (state) => ({
    ...state,
    posts: state.posts,
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    loading: true,
    error: null
  }),
  [CREATE_POST_SUCCESS]: (state, { payload }: AnyAction) => ({
    ...state,
    posts: [
      ...state.posts,
      payload.posts
    ],
    modal: initialState.modal,
    addSuccess: true,
    updateSuccess: false,
    deleteSuccess: false,
    loading: false,
    error: null
  }),
  [CREATE_POST_FAIL]: (state, { error }: AnyAction) => ({
    ...state,
    error,
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    loading: false
  }),
  [UPDATE_POST]: (state) => ({
    ...state,
    posts: state.posts,
    updateSuccess: false,
    addSuccess: false,
    deleteSuccess: false,
    loading: true,
    error: null
  }),
  [UPDATE_POST_SUCCESS]: (state, { payload }: AnyAction) => ({
    ...state,
    posts: state.posts.map(p => p._id === payload.posts._id ? payload.posts : p),
    modal: initialState.modal,
    updateSuccess: true,
    addSuccess: false,
    deleteSuccess: false,
    loading: false,
    error: null
  }),
  [UPDATE_POST_FAIL]: (state, { error }: AnyAction) => ({
    ...state,
    error,
    updateSuccess: false,
    addSuccess: false,
    deleteSuccess: false,
    loading: false
  }),
  [DELETE_POST]: (state) => ({
    ...state,
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    loading: true,
    error: null
  }),
  [DELETE_POST_SUCCESS]: (state, { payload }: AnyAction) => {
    return {
      ...state,
      posts: state.posts.filter(p => p._id !== payload.posts._id),
      deleteSuccess: true,
      addSuccess: false,
      updateSuccess: false,
      loading: false,
      error: null
    }
  },
  [DELETE_POST_FAIL]: (state, { error }: AnyAction) => ({
    ...state,
    error,
    deleteSuccess: false,
    addSuccess: false,
    updateSuccess: false,
    loading: false
  }),
  [CLOSE_POSTS_NOTIF]: (state) => ({
    ...state,
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
  }),
  [CLOSE_POSTS_ERROR]: (state) => ({
    ...state,
    error: null
  }),
  [MODAL_OPEN]: (state, { payload }: AnyAction) => ({
    ...state,
    modal: {
      opened: true,
      new: payload.isNew,
      postId: payload.postId
    }
  }),
  [MODAL_CLOSE]: (state) => ({
    ...state,
    modal: {
      opened: false,
      new: false,
      postId: null
    }
  })
}, initialState);

export default postsReducer;