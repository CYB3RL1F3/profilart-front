import React, { FC, useCallback, useEffect } from "react";
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
import { scrollToElementClassName } from "utils/scroll";
import { Footer } from "components/molecules";
import paths from "paths";

export const Register: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const onSubmit = useCallback((newProfile: CreateProfileFormData) => {
    dispatch(createProfile(newProfile));
  }, [dispatch]);
  const { created, error, loading } = useSelector<AppState, UserReducer>(({ user }) => user);

  const closeMessage = useCallback(() => {
    dispatch(closeCreateNotification());
    setTimeout(() => {
      history.push(paths.login);
    }, 250);
  }, [dispatch, history]);

  const closeError = useCallback(() => {
    dispatch(closeErrorNotification())
  }, [dispatch]);
  
  useEffect(() => {
  if (created) {
    setTimeout(() => {
      scrollToElementClassName("messages", 20);
    }, 100);
    setTimeout(() => {
      closeMessage(); // autoclose
    }, 4000);
  }
}, [created, closeMessage])

  return (
    <PageLayout className="register">
      <Grid>
        <GridCol6>
          <h1>Create your profile and enjoy Profilart!</h1>
        </GridCol6>
        <GridCol6>
          <p className="goback">
            <Link to={paths.login}>
              back to login form
            </Link>
          </p>
        </GridCol6>
      </Grid>
      <Grid className="messages">
        {created && (
          <Message onClose={closeMessage} type={MessageType.success} summary="Profile successfully created!!" details="You will be redirected. Sign in to check your informations." />
        )}
        {error && (
          <Message onClose={closeError} type={MessageType.error} summary="A fatal error occured!!" details={`${error.message}. Checkout your informations and retry.`} />
        )}
      </Grid>
      <ProfileForm loading={loading || created} onSubmit={onSubmit} context={ProfileFormContexts.create} />
      <Footer />
    </PageLayout>
  )
};

export default withRouter(Register);