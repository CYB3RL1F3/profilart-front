import api, { ApiReducer } from './api';
import user, { UserReducer } from './user';
import { sessionReducer as session } from 'redux-react-session';
import posts, { PostsReducer } from './posts';
import { combineReducers } from 'redux';
import { routerReducer as routing, RouterState } from 'react-router-redux';
import support, { SupportReducer } from './support';
import { NotificationCenterReducer } from 'types/Notifications';
import notifications from './notifications';

export interface SessionReducer {
  authenticated: boolean;
  checked: boolean;
}
export interface AppState {
  api: ApiReducer;
  user: UserReducer;
  posts: PostsReducer;
  support: SupportReducer;
  session: SessionReducer;
  notifications: NotificationCenterReducer;
  routing: RouterState
}

export const reducers = combineReducers<AppState>({
  api,
  user,
  posts,
  support,
  notifications,
  session,
  routing
})

export default reducers;