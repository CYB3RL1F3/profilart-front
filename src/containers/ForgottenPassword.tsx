import React, { FC, useCallback } from "react";
import ForgottenPasswordForm from "components/templates/ForgottenPasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { recoverPassword, closeForgottenPasswordNotification } from 'actions/user';
import { AppState } from 'reducers';
import { APIError } from 'types/Api';
import paths from 'paths';

export interface ForgottenPasswordSelector {
  error: APIError;
  sent: boolean;
  loading: boolean;
}

export const ForgottenPassword: FC = () => {
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (email: string) => {
      dispatch(recoverPassword(email));
    },
    [dispatch],
  )
  const closeAndRedirect = () => {
    dispatch(closeForgottenPasswordNotification());
    setTimeout(() => {
      window.document.location.href = paths.login;
    }, 100);
  }
  const { error, sent, loading } = useSelector<AppState, ForgottenPasswordSelector>(({ user }) => ({
    error: user.error || null,
    loading: user.loading,
    sent: user.sent
  }));
  return (
    <ForgottenPasswordForm
      closeAndRedirect={closeAndRedirect} 
      onSubmit={onSubmit} 
      error={error} 
      loading={loading} 
      sent={sent} 
    />
  );
}

export default ForgottenPassword;