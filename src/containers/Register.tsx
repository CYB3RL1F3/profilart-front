import React, { FC, useCallback } from "react";
import ProfileForm, { ProfileFormContexts } from 'components/templates/ProfileForm';
import { PageLayout } from "components/layouts/PageLayout";
import { Grid, Message } from "components/atoms";
import { GridCol6 } from "components/atoms/Grid";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { createProfile, closeErrorNotification, closeCreateNotification } from '../actions/user';
import { useDispatch, useSelector } from "react-redux";
import { CreateProfileFormData } from "types/Profile";
import { AppState } from "reducers";
import { UserReducer } from "reducers/user";
import { MessageType } from "components/atoms/Message";

export const Register: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const onSubmit = useCallback((newProfile: CreateProfileFormData) => {
    dispatch(createProfile(newProfile));
  }, [dispatch]);
  const { created, error, loading } = useSelector<AppState, UserReducer>(({ user }) => user);

  const closeMessage = useCallback(() => {
    dispatch(closeCreateNotification());
    setTimeout(() => {
      history.push('/login');
    }, 250);
  }, [dispatch, history]);

  const closeError = useCallback(() => {
    dispatch(closeErrorNotification())
  }, [dispatch]);

  if (created) {
    setTimeout(() => {
      closeMessage();
    }, 4000);
  }

  return (
    <PageLayout className="register">
      <Grid>
        <GridCol6>
          <h1>Create your profile</h1>
        </GridCol6>
        <GridCol6>
          <p className="goback">
            <Link to="/login">
              back to login form
            </Link>
          </p>
        </GridCol6>
      </Grid>
      <Grid className="messages">
        {created && (
          <Message onClose={closeMessage} type={MessageType.success} summary="Profile successfully created!!" details="Login to check your informations." />
        )}
        {error && (
          <Message onClose={closeError} type={MessageType.error} summary="An error occured!!" details="Checkout your informations." />
        )}
      </Grid>
      <ProfileForm loading={loading} onSubmit={onSubmit} context={ProfileFormContexts.create} />
    </PageLayout>
  )
};

export default withRouter(Register);