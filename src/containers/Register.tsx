import React, { FC } from "react";
import ProfileForm, { ProfileFormContexts } from 'components/templates/ProfileForm';

export const Register: FC = () => (
  <ProfileForm context={ProfileFormContexts.create} />
);

export default Register;