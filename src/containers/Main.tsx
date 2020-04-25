import React, { FC } from "react";
import ProfileForm, { ProfileFormContexts } from 'components/templates/ProfileForm';

export const Main: FC = () => (
  <ProfileForm context={ProfileFormContexts.edit} />
);

export default Main;