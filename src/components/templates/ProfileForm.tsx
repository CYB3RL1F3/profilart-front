/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useMemo } from "react";
import { Card } from "components/atoms";
import { Input, Checkbox, Slider } from "components/molecules";
import { useForm } from "react-hook-form";
import { GridDashboard, GridCol6, GridCol } from "components/atoms/Grid";
import { Button } from "primereact/button";
import { PASSWORD, CONFIRM_PASSWORD, WEBSITE, RESIDENT_ADVISOR, DISCOGS, MAILER, CACHE } from 'constants/profileForm';
import { CURRENT_PASSWORD, ARTIST_NAME, EMAIL, SOUNDCLOUD } from '../../constants/profileForm';
import { validateResidentAdvisor } from "utils/validators";
import { Profile, UpdateProfileFormData } from 'types/Profile';

export enum ProfileFormContexts {
  edit = "edit",
  create = "create"
}

export interface ProfileFormProps {
  context: ProfileFormContexts;
  onSubmit: (values: UpdateProfileFormData) => void;
  defaultValues?: Profile;
}

export const ProfileForm: FC<ProfileFormProps> = ({ context, defaultValues, onSubmit }) => {
  const submit = useCallback((values) => {
    onSubmit(values);
  }, [onSubmit]);
  const { register, handleSubmit, errors, setValue, watch, getValues } = useForm({
    defaultValues
  });
  console.log(errors, getValues());
  const isCreationForm = useMemo(() => context === ProfileFormContexts.create, [context]);
  const doRegistration = useCallback((name: string, required: boolean, extraProps?: any) => {
    register({ 
      name
    }, { 
      required,
      ...extraProps
    });
  }, [register]);

  const deleteAccount = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('delete account');
  }, []);


  const setEmail = useCallback((value: string) => setValue(EMAIL, value), [setValue]);
  const setArtistName = useCallback((value: string) => setValue(ARTIST_NAME, value), [setValue]);
  const setWebsite = useCallback((value: string) => setValue(WEBSITE, value), [setValue]);
  const setPassword = useCallback((value: string) => setValue(PASSWORD, value), [setValue]);
  const setConfirmPassword = useCallback((value: string) => setValue(CONFIRM_PASSWORD, value), [setValue]);
  const setCurrentPassword = useCallback((value: string) => setValue(CURRENT_PASSWORD, value), [setValue]);

  const setAccessKey = useCallback((value: string) => setValue(RESIDENT_ADVISOR.ACCESS_KEY, value), [setValue]);
  const setDJID = useCallback((value: string) => setValue(RESIDENT_ADVISOR.DJID, value), [setValue]);
  const setUserId = useCallback((value: string) => setValue(RESIDENT_ADVISOR.USER_ID, value), [setValue]);
  
  const setSoundcloud = useCallback((value: string) => setValue(SOUNDCLOUD.URL, value), [setValue]);
  const setDiscogs = useCallback((value: string) => setValue(DISCOGS.URL, value), [setValue]);
  
  const setRecipient = useCallback((value: string) => setValue(MAILER.RECIPIENT, value), [setValue]);
  const setPrefix = useCallback((value: string) => setValue(MAILER.PREFIX, value), [setValue]);

  const setUseCache = useCallback((value: boolean) => setValue(CACHE.USE, value), [setValue]);
  const setSoundcloudCacheTTL = useCallback((value: number) => setValue(CACHE.TTL.SOUNDCLOUD, value), [setValue]);
  const setDiscogsCacheTTL = useCallback((value: number) => setValue(CACHE.TTL.DISCOGS, value), [setValue]);
  const setResidentAdvisorCacheTTL = useCallback((value: number) => setValue(CACHE.TTL.RA, value), [setValue]);
  
  useEffect(() => {
    doRegistration(EMAIL, true, {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "invalid email address"
      }
    });
    
    doRegistration(WEBSITE, true);
    doRegistration(ARTIST_NAME, true);

    doRegistration(PASSWORD, false);
    doRegistration(CONFIRM_PASSWORD, false, {
      validate: (value: string) => value === watch(isCreationForm ? CURRENT_PASSWORD : PASSWORD)
    });
    doRegistration(CURRENT_PASSWORD, true);

    doRegistration(RESIDENT_ADVISOR.ACCESS_KEY, false, {
      validate: (value: string) => validateResidentAdvisor(watch(RESIDENT_ADVISOR.DJID), value, watch(RESIDENT_ADVISOR.USER_ID))
    });
    doRegistration(RESIDENT_ADVISOR.DJID, false, {
      validate: (value: string) => validateResidentAdvisor(value, watch(RESIDENT_ADVISOR.ACCESS_KEY), watch(RESIDENT_ADVISOR.USER_ID))
    });
    doRegistration(RESIDENT_ADVISOR.USER_ID, false, {
      validate: (value: string) => validateResidentAdvisor(watch(RESIDENT_ADVISOR.ACCESS_KEY), watch(RESIDENT_ADVISOR.DJID), value)
    });

    doRegistration(SOUNDCLOUD.URL, false);
    doRegistration(DISCOGS.URL, false);
    doRegistration(MAILER.RECIPIENT, false, {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "invalid email address"
      }
    });
    doRegistration(MAILER.PREFIX, false);
    doRegistration(CACHE.USE, false);
    doRegistration(CACHE.TTL.DISCOGS, false);
    doRegistration(CACHE.TTL.RA, false);
    doRegistration(CACHE.TTL.SOUNDCLOUD, false);

  }, []);

  const usingCache = watch(CACHE.USE);
  const disableCheckbox = usingCache === undefined ? !defaultValues?.cache?.use || false : !usingCache;

  const label = useMemo(() => isCreationForm ? "Create a profile" : "Edit a profile", [isCreationForm])
  
  const passwordLabel = isCreationForm ? "password" : "new password";
  return (
    <form className="profile_editor" onSubmit={handleSubmit(submit)}>
      <GridDashboard>
        <GridCol6>
          <GridCol>
            <Card title="General informations">
              <Input
                id={EMAIL}
                type="email"
                label="Email"
                defaultValue={defaultValues?.email}
                keyfilter="email"
                name={EMAIL}
                onChange={setEmail}
              />
              <Input
                id={ARTIST_NAME}
                type="text"
                label="Artist name"
                defaultValue={defaultValues?.artistName}
                name={ARTIST_NAME}
                onChange={setArtistName}
              />
              <Input
                id={WEBSITE}
                type="text"
                label="Website"
                defaultValue={defaultValues?.website}
                name={WEBSITE}
                onChange={setWebsite}
              />
              
              { errors.email && errors.email.message }
            </Card>
          </GridCol>
          <GridCol>
            <Card title="Authentication informations">
              {!isCreationForm && (
                <Input
                  id={CURRENT_PASSWORD}
                  type="password"
                  label="Current password"
                  name={CURRENT_PASSWORD}
                  onChange={setCurrentPassword}
              />
              )}
              <Input
                id={isCreationForm ? CURRENT_PASSWORD : PASSWORD}
                type="password"
                label={passwordLabel} 
                name={isCreationForm ? CURRENT_PASSWORD : PASSWORD}
                onChange={isCreationForm ? setCurrentPassword : setPassword}
              />
              <Input
                id={CONFIRM_PASSWORD}
                type="password"
                label="Confirm Password"
                name={CONFIRM_PASSWORD}
                onChange={setConfirmPassword}
              />
            </Card>
          </GridCol>
          <GridCol>
            <Card title="Mailer configuration">
              <p>Configure your recipient for contact emails form through Profilart.</p>
              <p></p>
              <Input
                id={MAILER.RECIPIENT}
                type="email"
                label="Recipient"
                defaultValue={defaultValues?.mailer?.recipient}
                name={MAILER.RECIPIENT}
                onChange={setRecipient}
              />
              <Input
                id={MAILER.PREFIX}
                type="text"
                label="Prefix" 
                defaultValue={defaultValues?.mailer?.prefix}
                name={MAILER.PREFIX}
                onChange={setPrefix}
              />
            </Card>
          </GridCol>
        </GridCol6>
        <GridCol6>
          <GridCol>
            <Card title="Resident Advisor API Credentials">
              <Input
                id={RESIDENT_ADVISOR.ACCESS_KEY}
                type="text"
                label="Access key"
                defaultValue={defaultValues?.residentAdvisor?.accessKey}
                name={RESIDENT_ADVISOR.ACCESS_KEY}
                onChange={setAccessKey}
              />
              <Input
                id={RESIDENT_ADVISOR.DJID}
                type="text"
                label="DJID" 
                defaultValue={defaultValues?.residentAdvisor?.DJID}
                name={RESIDENT_ADVISOR.DJID}
                onChange={setDJID}
              />
              <Input
                id={RESIDENT_ADVISOR.USER_ID}
                type="text"
                label="User ID"
                defaultValue={defaultValues?.residentAdvisor?.userId}
                name={RESIDENT_ADVISOR.USER_ID}
                onChange={setUserId}
              />
            </Card>
          </GridCol>
          <GridCol>
            <Card title="Other information sources">
              <Input
                id={SOUNDCLOUD.URL}
                type="text"
                label="Soundcloud"
                defaultValue={defaultValues?.soundcloud?.url}
                name={SOUNDCLOUD.URL}
                onChange={setSoundcloud}
              />
              <Input
                id={DISCOGS.URL}
                type="text"
                defaultValue={defaultValues?.discogs?.url}
                label="Discogs" 
                name={DISCOGS.URL}
                onChange={setDiscogs}
              />
            </Card>
          </GridCol>
          <GridCol>
            <Card title="API Cache configuration">
              <p>You can parameter cache to improve API performance</p>
              <Checkbox
                id={CACHE.USE}
                label="enable temp storing results in cache"
                onChange={setUseCache}
                name={CACHE.USE}
                defaultChecked={defaultValues?.cache?.use}
              />
              <p className={disableCheckbox ? 'disabled' : ''}>Define cache TTL duration (in seconds):</p>
              <Slider 
                id={CACHE.TTL.SOUNDCLOUD}
                label="Soundcloud : ## seconds"
                defaultValue={defaultValues?.cache?.ttl?.soundcloud}
                onChange={setSoundcloudCacheTTL}
                disabled={disableCheckbox}
                min={0}
                max={7200}
                step={5}
              />
              <Slider 
                id={CACHE.TTL.DISCOGS}
                label="Discogs : ## seconds"
                defaultValue={defaultValues?.cache?.ttl?.discogs}
                onChange={setDiscogsCacheTTL}
                disabled={disableCheckbox}
                min={0}
                max={7200}
                step={5}
              />
              <Slider 
                id={CACHE.TTL.RA}
                label="Resident Advisor : ## seconds"
                defaultValue={defaultValues?.cache?.ttl?.RA}
                onChange={setResidentAdvisorCacheTTL}
                disabled={disableCheckbox}
                min={0}
                max={7200}
                step={5}
              />
            </Card>
          </GridCol>
          <GridCol className="buttonsBar">
            <Button label={label} className="p-button-success" icon="pi pi-md-create" />
            {!isCreationForm && (
              <Button onClick={deleteAccount} label="Delete your account" className="p-button-danger" icon="pi pi-md-delete-forever" />
            )}
          </GridCol>
        </GridCol6>
      </GridDashboard>
    </form>
  )
};

export default ProfileForm;