/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "components/atoms";
import { Input, Checkbox, Slider } from "components/molecules";
import { useForm } from "react-hook-form";
import { GridDashboard, GridCol6, GridCol, GridCol12 } from "components/atoms/Grid";
import { Button } from "primereact/button";
import { PASSWORD, CONFIRM_PASSWORD, WEBSITE, RESIDENT_ADVISOR, DISCOGS, MAILER, CACHE, CURRENT_PASSWORD, ARTIST_NAME, EMAIL, SOUNDCLOUD } from 'constants/profileForm';
import { validateResidentAdvisor } from "utils/validators";
import { Profile, UpdateProfileFormData } from 'types/Profile';
import { scrollToTopestElementClassName } from "utils/scroll";

export enum ProfileFormContexts {
  edit = "edit",
  create = "create"
}

export interface ProfileFormProps {
  context: ProfileFormContexts;
  onSubmit: (values: UpdateProfileFormData) => void;
  defaultValues?: Profile;
  loading: boolean;
}

export const ProfileForm: FC<ProfileFormProps> = ({ loading, context, defaultValues, onSubmit }) => {
  const isCreationForm = useMemo(() => context === ProfileFormContexts.create, [context]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const activateAutoValidation = useCallback(() => {
    setSubmitted(true);
  }, [setSubmitted]);

  const mapValues = useCallback((values: UpdateProfileFormData): UpdateProfileFormData => {
    if (!values.residentAdvisor?.userId && !values.residentAdvisor?.DJID && !values.residentAdvisor?.accessKey) {
      delete values.residentAdvisor;
    }
    if (!values.soundcloud?.url) delete values.soundcloud;
    if (!values.discogs?.url) delete values.discogs;
    if (!values.mailer?.prefix && !values.mailer?.recipient) {
      delete values.mailer;
    }
    if (!values.cache?.use) {
      delete values.cache;
    }
    const currentEmail = `${defaultValues?.email}`;
    if (!isCreationForm && currentEmail) {
      values.totalReplace = (values.password === "" && values.newPassword === "" && values.email === currentEmail);
      console.log(currentEmail, values.email, currentEmail && values.email !== currentEmail);
      if (currentEmail && values.email !== currentEmail) {
        values.newEmail = values.email;
        values.email = currentEmail;
      }
    }
    delete values.confirmPassword;
    return values;
  }, [defaultValues]);
  const submit = useCallback((values) => {
    onSubmit(mapValues(values));
  }, [onSubmit, mapValues]);
  const { register, handleSubmit, errors, setValue, watch, getValues } = useForm<any, any>({
    defaultValues
  });
  console.log(errors, "XXX", getValues(), submitted);
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


  const setEmail = useCallback((value: string) => setValue(EMAIL, value, submitted), [setValue]);
  const setArtistName = useCallback((value: string) => setValue(ARTIST_NAME, value, submitted), [setValue]);
  const setWebsite = useCallback((value: string) => setValue(WEBSITE, value, submitted), [setValue]);
  const setPassword = useCallback((value: string) => setValue(PASSWORD, value, submitted), [setValue]);
  const setConfirmPassword = useCallback((value: string) => setValue(CONFIRM_PASSWORD, value, submitted), [setValue]);
  const setCurrentPassword = useCallback((value: string) => setValue(CURRENT_PASSWORD, value, submitted), [setValue]);

  const setAccessKey = useCallback((value: string) => setValue(RESIDENT_ADVISOR.ACCESS_KEY, value, submitted), [setValue]);
  const setDJID = useCallback((value: string) => setValue(RESIDENT_ADVISOR.DJID, value, submitted), [setValue]);
  const setUserId = useCallback((value: string) => setValue(RESIDENT_ADVISOR.USER_ID, value, submitted), [setValue]);
  
  const setSoundcloud = useCallback((value: string) => setValue(SOUNDCLOUD.URL, value, submitted), [setValue]);
  const setDiscogs = useCallback((value: string) => setValue(DISCOGS.URL, value, submitted), [setValue]);
  
  const setRecipient = useCallback((value: string) => setValue(MAILER.RECIPIENT, value, submitted), [setValue]);
  const setPrefix = useCallback((value: string) => setValue(MAILER.PREFIX, value, submitted), [setValue]);

  const setUseCache = useCallback((value: boolean) => setValue(CACHE.USE, value, submitted), [setValue]);
  const setSoundcloudCacheTTL = useCallback((value: number) => setValue(CACHE.TTL.SOUNDCLOUD, value, submitted), [setValue]);
  const setDiscogsCacheTTL = useCallback((value: number) => setValue(CACHE.TTL.DISCOGS, value, submitted), [setValue]);
  const setResidentAdvisorCacheTTL = useCallback((value: number) => setValue(CACHE.TTL.RA, value, submitted), [setValue]);
  
  useEffect(() => {
    doRegistration(EMAIL, true, {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "invalid email address"
      }
    });
    doRegistration(WEBSITE, true, {
      validate: (value: string) => !value || /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gmi.test(value) ? true : "invalid URL"
    });
    doRegistration(ARTIST_NAME, true, {
      min: 2
    });

    doRegistration(PASSWORD, false, {
      validate: (value: string) => !value || /^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=_]).*$/gm.test(value) ? true : "Requires at least 8 chars, including 1 major, 1 number and 1 special"
    });
    doRegistration(CONFIRM_PASSWORD, false, {
      validate: (value: string) => value === watch(isCreationForm ? CURRENT_PASSWORD : PASSWORD) ? true : `Must match with your ${isCreationForm ? 'password' : 'new password'}`
    });
    doRegistration(CURRENT_PASSWORD, false);
    
    doRegistration(RESIDENT_ADVISOR.ACCESS_KEY, false, {
      validate: {
        allSet: (value: string) => !!value || (!value && validateResidentAdvisor(watch(RESIDENT_ADVISOR.DJID), value, watch(RESIDENT_ADVISOR.USER_ID))) ? true : "All Resident Advisor API infos must be set"
      }
    });
    doRegistration(RESIDENT_ADVISOR.DJID, false, {
      validate: {
        allSet: (value: string) => !!value || (!value && validateResidentAdvisor(value, watch(RESIDENT_ADVISOR.ACCESS_KEY), watch(RESIDENT_ADVISOR.USER_ID))) ? true : "All Resident Advisor API infos must be set",
        mustBeNumber: (value: string) => !value || /[0-9]*/gm.test(value) ? true : "Can only be a number"
      }
    });
    doRegistration(RESIDENT_ADVISOR.USER_ID, false, {
      validate: {
        allSet: (value: string) => !!value || (!value && validateResidentAdvisor(watch(RESIDENT_ADVISOR.DJID), watch(RESIDENT_ADVISOR.ACCESS_KEY), value)) ? true : "All Resident Advisor API infos must be set",
        mustBeNumber: (value: string) => !value || /[0-9]*/gm.test(value) ? true : "Can only be a number"
      }
    });

    doRegistration(SOUNDCLOUD.URL, false, {
      validate: (value: string) => !value || /^(?:https?:\/\/)?(soundcloud.com\/)[a-zA-Z0-9\-_.]*/gmi.test(value) ? true : "invalid Soundcloud artist page URL"
    });
    doRegistration(DISCOGS.URL, false, {
      validate: (value: string) => !value || /^(?:https?:\/\/)(www\.)?(discogs\.com\/artist\/)[a-zA-Z0-9\-_.].*/gmi.test(value) ? true :  "invalid Discogs artist page URL"
    });
    doRegistration(MAILER.RECIPIENT, false, {
      validate: {
        isValid: (value: string) => !value || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? true : "Invalid email address",
        canBeEmpty: (value: string) => !value || (!!value && !!watch(MAILER.PREFIX) ? true : "You can't define prefix without recipient")
      }
    });
    doRegistration(CACHE.USE, false);
    doRegistration(CACHE.TTL.DISCOGS, false);
    doRegistration(CACHE.TTL.RA, false);
    doRegistration(CACHE.TTL.SOUNDCLOUD, false);

  }, []);

  useEffect(() => {
   setTimeout(() => {
    const offset = 0.4 * window.innerHeight;
    scrollToTopestElementClassName("input-error", offset);
   }, 100);
  })

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
              <GridCol12>
                <Input
                  id={EMAIL}
                  type="email"
                  label="Email"
                  defaultValue={defaultValues?.email}
                  keyfilter="email"
                  name={EMAIL}
                  onChange={setEmail}
                  error={errors.email?.message || errors.email?.type}
                />
                <Input
                  id={ARTIST_NAME}
                  type="text"
                  label="Artist name"
                  defaultValue={defaultValues?.artistName}
                  name={ARTIST_NAME}
                  onChange={setArtistName}
                  error={errors.artistName?.message || errors.artistName?.type}
                />
                <Input
                  id={WEBSITE}
                  type="text"
                  label="Website"
                  defaultValue={defaultValues?.website}
                  name={WEBSITE}
                  onChange={setWebsite}
                  error={errors.website?.message || errors.website?.type}
                />
              </GridCol12>
            </Card>
          </GridCol>
          <GridCol>
            <Card title="Authentication informations">
              <GridCol12>
                {!isCreationForm && (
                  <Input
                    id={CURRENT_PASSWORD}
                    type="password"
                    label="Current password"
                    name={CURRENT_PASSWORD}
                    disableAutofill
                    onChange={setCurrentPassword}
                    error={errors.password?.message || errors.password?.type}
                />
                )}
                <Input
                  id={isCreationForm ? CURRENT_PASSWORD : PASSWORD}
                  type="password"
                  autoComplete="new-password"
                  label={passwordLabel} 
                  name={isCreationForm ? CURRENT_PASSWORD : PASSWORD}
                  onChange={isCreationForm ? setCurrentPassword : setPassword}
                  error={(isCreationForm ? errors.password?.message || errors.password?.type : errors.newPassword?.message || errors.newPassword?.type)}
                />
                <Input
                  id={CONFIRM_PASSWORD}
                  type="password"
                  label="Confirm Password"
                  name={CONFIRM_PASSWORD}
                  onChange={setConfirmPassword}
                  error={errors.confirmPassword?.message || errors.confirmPassword?.type}
                />
              </GridCol12>
            </Card>
          </GridCol>
          <GridCol>
            <Card title="Mailer configuration">
              <p>Configure your recipient for contact emails form through Profilart.</p>
              <GridCol12>
                <Input
                  id={MAILER.RECIPIENT}
                  type="email"
                  label="Recipient"
                  defaultValue={defaultValues?.mailer?.recipient}
                  name={MAILER.RECIPIENT}
                  onChange={setRecipient}
                  error={errors.mailer?.recipient?.message || errors.mailer?.recipient?.type}
                />
                <Input
                  id={MAILER.PREFIX}
                  type="text"
                  label="Prefix" 
                  defaultValue={defaultValues?.mailer?.prefix}
                  error={errors.mailer?.prefix?.message || errors.mailer?.prefix?.type}
                  name={MAILER.PREFIX}
                  onChange={setPrefix}
                />
              </GridCol12>
            </Card>
          </GridCol>
        </GridCol6>
        <GridCol6>
          <GridCol>
            <Card title="Resident Advisor API Credentials">
              <GridCol12>
                <Input
                  id={RESIDENT_ADVISOR.ACCESS_KEY}
                  type="text"
                  label="Access key"
                  defaultValue={defaultValues?.residentAdvisor?.accessKey}
                  name={RESIDENT_ADVISOR.ACCESS_KEY}
                  onChange={setAccessKey}
                  error={errors.residentAdvisor?.accessKey?.message || errors.residentAdvisor?.accessKey?.type}
                />
                <Input
                  id={RESIDENT_ADVISOR.DJID}
                  type="text"
                  label="DJID" 
                  defaultValue={defaultValues?.residentAdvisor?.DJID}
                  name={RESIDENT_ADVISOR.DJID}
                  onChange={setDJID}
                  error={errors.residentAdvisor?.DJID?.message || errors.residentAdvisor?.DJID?.type}
                />
                <Input
                  id={RESIDENT_ADVISOR.USER_ID}
                  label="User ID"
                  defaultValue={defaultValues?.residentAdvisor?.userId}
                  name={RESIDENT_ADVISOR.USER_ID}
                  onChange={setUserId}
                  error={errors.residentAdvisor?.userId?.message || errors.residentAdvisor?.userId?.type}
                />
              </GridCol12>
            </Card>
          </GridCol>
          <GridCol>
            <Card title="Other information sources">
              <GridCol12>
                <Input
                  id={SOUNDCLOUD.URL}
                  type="text"
                  label="Soundcloud"
                  defaultValue={defaultValues?.soundcloud?.url}
                  name={SOUNDCLOUD.URL}
                  onChange={setSoundcloud}
                  error={errors.soundcloud?.url?.message || errors.soundcloud?.url?.type}
                />
                <Input
                  id={DISCOGS.URL}
                  type="text"
                  defaultValue={defaultValues?.discogs?.url}
                  label="Discogs" 
                  name={DISCOGS.URL}
                  onChange={setDiscogs}
                  error={errors.discogs?.url?.message || errors.discogs?.url?.type}
                />
              </GridCol12>
            </Card>
          </GridCol>
          <GridCol>
            <Card title="API Cache configuration">
              <p>You can parameter cache to improve API performance</p>
              <GridCol12>
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
              </GridCol12>
            </Card>
          </GridCol>
          <GridCol className="buttonsBar">
            <Button disabled={loading} onClick={activateAutoValidation} label={label} className="p-button-success" icon="pi pi-md-create" />
            {!isCreationForm && (
              <Button disabled={loading} onClick={deleteAccount} label="Delete your account" className="p-button-danger" icon="pi pi-md-delete-forever" />
            )}
          </GridCol>
        </GridCol6>
      </GridDashboard>
    </form>
  )
};

export default ProfileForm;