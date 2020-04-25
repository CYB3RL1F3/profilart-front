import React, { FC, useCallback } from "react";
import LoginForm from "components/templates/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { Credentials } from 'types/Profile';
import { authenticate } from '../actions/user';
import { AppState } from 'reducers';
import { Redirect } from "react-router-dom";

export interface LoginSelector {
  authenticated: boolean;
  deleted: boolean;
  loading: boolean;
  error: boolean;
}

export const Login: FC = () => {
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (credentials: Credentials) => {
      dispatch(authenticate(credentials));
    },
    [dispatch],
  )
  const { authenticated, deleted, loading, error } = useSelector<AppState, LoginSelector>(({ session, user }) => ({
    authenticated: session.authenticated,
    deleted: user.deleted || false,
    loading: user.loading || false,
    error: user.error || false
  }));
  if (authenticated) {
    return (
      <Redirect to={{
          pathname: '/'
      }}/>
    )
  }
  return (
    <LoginForm onSubmit={onSubmit} error={error} loading={loading} deleted={deleted} />
  );
}

export default Login;