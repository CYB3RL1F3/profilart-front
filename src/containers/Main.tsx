import React, { FC, useCallback, useEffect } from "react";
import ProfileForm, { ProfileFormContexts } from 'components/templates/ProfileForm';
import { PageLayout } from "components/layouts/PageLayout";
import { Grid, Message } from "components/atoms";
import { GridCol6 } from "components/atoms/Grid";
import { Profile, UpdateProfileFormData } from 'types/Profile';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'reducers';
import { MessageType } from "components/atoms/Message";
import { UserReducer } from "reducers/user";
import { updateProfile, closeUpdateNotification, closeErrorNotification } from 'actions/user';
import { scrollToElementClassName } from "utils/scroll";
import { deleteProfile } from '../actions/user';
import { Footer } from "components/molecules";
import paths from "paths";

export interface Selector {
  profile: Profile | null;
  loading: boolean;
}

export const Main: FC = () => {
  const { profile, loading, updated, deleted, error } = useSelector<AppState, UserReducer>(({ user }) => user);
  const dispatch = useDispatch();

  const onSubmit = useCallback((updatedProfile: UpdateProfileFormData) => {
    if (!profile || (profile && !profile?.uid)) return;
    updatedProfile.uid = profile?.uid;
    dispatch(updateProfile(updatedProfile));
  }, [profile, dispatch]);

  const closeMessage = useCallback(() => {
    dispatch(closeUpdateNotification())
  }, [dispatch]);

  const closeError = useCallback(() => {
    dispatch(closeErrorNotification())
  }, [dispatch]);

  const deleteProfileAction = useCallback(() => {
    if (profile) deleteProfile()
  }, [profile]);

  useEffect(() => {
    if (updated || error) {
      setTimeout(() => {
        scrollToElementClassName("messages", 20);
      }, 100);
    }
  }, [updated, error])

  useEffect(() => {
    if (deleted) {
      setTimeout(() => {
        window.document.location.replace(paths.login);
      }, 50);
    }
  }, [deleted])

  return (
    <PageLayout className="editPage">
      <Grid>
        <GridCol6>
          <h1>Edit my profile</h1>
        </GridCol6>
      </Grid>
      <Grid className="messages">
        {updated && (
          <Message onClose={closeMessage} type={MessageType.success} summary="Profile successfully updated!!" details="Your infos are now up to date." />
        )}
        {error && (
          <Message onClose={closeError} type={MessageType.error} summary="A fatal error occured!!" details={` ${error.message}. Checkout your informations and retry.`} />
        )}
      </Grid>
      {profile && (
        <>
          <h4>My profile UID: {profile.uid}</h4>
          <ProfileForm
            loading={loading}
            onSubmit={onSubmit}
            defaultValues={profile}
            context={ProfileFormContexts.edit} 
            onDelete={deleteProfileAction}
          />
        </>
      )}
      {!profile && <Message type={MessageType.error} summary="Impossible to edit inexisting profile" />}
      <Footer />
    </PageLayout>
  );
}

export default Main;