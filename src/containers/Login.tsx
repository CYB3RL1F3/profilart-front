/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect } from "react";
import LoginForm from "components/templates/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { Credentials } from 'types/Profile';
import { authenticate } from '../actions/user';
import { AppState } from 'reducers';
import { Redirect } from "react-router-dom";
import { APIError } from 'types/Api';
import { getStatus } from 'actions/api';

export interface LoginSelector {
  authenticated: boolean;
  deleted: boolean;
  loading: boolean;
  error: APIError;
  active: boolean;
}

export const Login: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStatus())
  }, []);
  const onSubmit = useCallback(
    (credentials: Credentials) => {
      dispatch(authenticate(credentials));
    },
    [dispatch],
  )
  const { authenticated, deleted, loading, error, active } = useSelector<AppState, LoginSelector>(({ session, user, api }) => ({
    authenticated: session.authenticated,
    deleted: user.deleted || false,
    loading: user.loading || false,
    error: user.error || null,
    active: api.active
  }));
  if (!active && !loading) {
    return (
      <Redirect to={{
          pathname: '/maintenance'
      }}/>
    )
  }
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