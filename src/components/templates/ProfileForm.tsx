import React, { FC } from "react";

export enum ProfileFormContexts {
  edit = "edit",
  create = "create"
}
export interface ProfileFormProps {
  context: ProfileFormContexts
}

export const ProfileForm: FC<ProfileFormProps> = ({ context }) => {
  return (
    <div />
  )
};

export default ProfileForm;