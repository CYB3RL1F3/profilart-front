import React, { FC, useCallback } from "react";
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

export interface Selector {
  profile: Profile | null;
  loading: boolean;
}

export const Main: FC = () => {
  const { profile, updated, error } = useSelector<AppState, UserReducer>(({ user }) => user);

  const dispatch = useDispatch();

  const onSubmit = useCallback((updatedProfile: UpdateProfileFormData) => {
    if (!profile?.email) return;
    delete updatedProfile.confirmPassword;
    updatedProfile.newEmail = updatedProfile.email;
    updatedProfile.email = profile?.email;
    updatedProfile.uid = profile?.uid;
    dispatch(updateProfile(updatedProfile));
  }, [profile, dispatch]);

  const closeMessage = useCallback(() => {
    dispatch(closeUpdateNotification())
  }, [dispatch]);

  const closeError = useCallback(() => {
    dispatch(closeErrorNotification())
  }, [dispatch]);

  return (
    <PageLayout>
      <Grid>
        <GridCol6>
          <h1>Edit your profile</h1>
        </GridCol6>
      </Grid>
      <Grid className="messages">
        {updated && (
          <Message onClose={closeMessage} type={MessageType.success} summary="Profile successfully updated!!" details="Your infos are now up to date." />
        )}
        {error && (
          <Message onClose={closeError} type={MessageType.error} summary="An error occured!!" details="Checkout your informations." />
        )}
      </Grid>
      {profile && (<ProfileForm onSubmit={onSubmit} defaultValues={profile} context={ProfileFormContexts.edit} />)}
      {!profile && <Message type={MessageType.error} summary="Impossible to edit inexisting profile" />}
      
    </PageLayout>
  );
}

export default Main;