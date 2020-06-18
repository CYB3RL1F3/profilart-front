/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useMemo, useEffect, useState } from "react";
import { Dialog } from "primereact-working/dialog";
import { useDispatch, useSelector } from "react-redux";
import { closeNotifModal, updateNotificationCenter, createNotificationCenter, closeNotificationCenterErrorNotif } from 'actions/notifications';
import { AppState } from 'reducers';
import { UserReducer } from '../../reducers/user';
import { useForm } from "react-hook-form";
import { GridCol, GridDashboard, GridCol12 } from "components/atoms/Grid";
import { Input } from "components/molecules";
import { Button } from "primereact-working/button";
import { Message } from "components/atoms";
import { MessageType } from "components/atoms/Message";
import { NotificationCenterReducer, NotificationCenter } from 'types/Notifications';
import { FORM_INPUT_WEBSITE, FORM_INPUT_GCM_API_KEY, FORM_INPUT_EMAIL } from "constants/notification";

type Field = "website" | "gcmApiKey" | "email";
export const NotificationCenterForm: FC = () => {

  const dispatch = useDispatch();
  const hide = useCallback(() => {
    dispatch(closeNotifModal());
  }, [dispatch]);

  const closeErrorMessage = useCallback(() => {
    dispatch(closeNotificationCenterErrorNotif());
  }, [dispatch]);
  
  const { notificationCenters, modal, loading, error } = useSelector<AppState, NotificationCenterReducer>(({ notifications }) => notifications);
  const { profile } = useSelector<AppState, UserReducer>(({ user }) => user);
  let currentNotificationCenter: NotificationCenter | null = null;
  if (modal.opened && modal.id) {
    currentNotificationCenter = notificationCenters.find(p => p.id === modal.id) || null;
  }
  const header: string = useMemo(() => !!currentNotificationCenter ? `Update notification center #${currentNotificationCenter.id}` : "Create a notification center", [currentNotificationCenter]);
  const { handleSubmit, register, setValue, errors } = useForm<any, any>({
    defaultValues: {
      [FORM_INPUT_WEBSITE]: currentNotificationCenter?.website || "",
      [FORM_INPUT_GCM_API_KEY]: currentNotificationCenter?.gcmApiKey || "",
      [FORM_INPUT_EMAIL]: currentNotificationCenter?.email || ""
    }
  });
  const registerInput = useCallback((name: Field, required: boolean, extraProps?: any) => {
    register({ 
      name
    }, { 
      required,
      ...extraProps
    });
  }, [register]);

  
  useEffect(() => {
    registerInput(FORM_INPUT_WEBSITE, true);
    registerInput(FORM_INPUT_GCM_API_KEY, false);
    registerInput(FORM_INPUT_EMAIL, true);
  }, []);

  const [submitted, setSubmitted] = useState<boolean>(false);

  const trySubmit = useCallback(() => setSubmitted(true), [setSubmitted]);
  
  const setWebsite = useCallback((value: string) => setValue(FORM_INPUT_WEBSITE, value, submitted), [setValue, submitted]);
  const setGcmApiKey = useCallback((value: string) => setValue(FORM_INPUT_GCM_API_KEY, value, false), [setValue]);
  const setEmail = useCallback((value: string) => setValue(FORM_INPUT_EMAIL, value, submitted), [setValue, submitted]);
  
  const submit = useCallback((values) => {
    if (!!currentNotificationCenter) {
      dispatch(updateNotificationCenter({
        id: currentNotificationCenter.id,
        ...values
      }));
    } else {
      dispatch(createNotificationCenter({
        ...values,
      }));
    }
  }, [currentNotificationCenter, dispatch, profile]);

  const label = useMemo(() => !currentNotificationCenter ? "Add notification center" : "Update notification center", [currentNotificationCenter]);

  return (
    <Dialog baseZIndex={10000000000} onHide={hide} visible={modal.opened} header={header}>
      <form className="post_editor" onSubmit={handleSubmit(submit)}>
        <GridDashboard>
          <GridCol>
            <GridCol12>
              {error && (
                <GridCol12>
                  <Message type={MessageType.error} summary={error.message} onClose={closeErrorMessage} />
                </GridCol12>
              )}
              <Input
                id={FORM_INPUT_WEBSITE}
                type="text"
                label="Website"
                defaultValue={currentNotificationCenter?.website}
                name={FORM_INPUT_WEBSITE}
                onChange={setWebsite}
                error={errors.website?.message || errors.website?.type}
              />
              <Input
                id={FORM_INPUT_GCM_API_KEY}
                type="text"
                label="GCM API Key"
                defaultValue={currentNotificationCenter?.gcmApiKey}
                name={FORM_INPUT_GCM_API_KEY}
                onChange={setGcmApiKey}
                error={errors.gcmApiKey?.message || errors.gcmApiKey?.type}
              />
              <Input
                id={FORM_INPUT_EMAIL}
                type="email"
                label="Email"
                defaultValue={currentNotificationCenter?.email}
                name={FORM_INPUT_EMAIL}
                onChange={setEmail}
              />
              <GridCol12>
                <Button onClick={trySubmit} disabled={loading} label={label} className="p-button-success" icon="pi pi-md-create" />
              </GridCol12>
            </GridCol12>
          </GridCol>
        </GridDashboard>
      </form>
    </Dialog>
  )
}