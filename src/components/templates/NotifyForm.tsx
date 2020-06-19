/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useMemo, useEffect, useState } from "react";
import { Dialog } from "primereact-working/dialog";
import { useDispatch, useSelector } from "react-redux";
import { closeNotificationModal, closeNotificationCenterErrorNotif, notify } from 'actions/notifications';
import { AppState } from 'reducers';
import { useForm } from "react-hook-form";
import { GridCol, GridDashboard, GridCol12 } from "components/atoms/Grid";
import { Input } from "components/molecules";
import { Button } from "primereact-working/button";
import { Message } from "components/atoms";
import { MessageType } from "components/atoms/Message";
import { NotificationCenterReducer } from 'types/Notifications';
import { FORM_INPUT_CONTENT, FORM_INPUT_TITLE, FORM_INPUT_ACTION } from "constants/notification";

type Field = "content" | "title" | "action";
export const NotifyForm: FC = () => {

  const dispatch = useDispatch();
  const hide = useCallback(() => {
    dispatch(closeNotificationModal());
  }, [dispatch]);

  const closeErrorMessage = useCallback(() => {
    dispatch(closeNotificationCenterErrorNotif());
  }, [dispatch]);
  
  const { notificationModal, loading, error } = useSelector<AppState, NotificationCenterReducer>(({ notifications }) => notifications);
  
  const header: string = useMemo(() => "Notify", []);
  const { handleSubmit, register, setValue, errors } = useForm<any, any>({
    defaultValues: {
      [FORM_INPUT_CONTENT]: "",
      [FORM_INPUT_TITLE]: "",
      [FORM_INPUT_ACTION]: ""
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
    registerInput(FORM_INPUT_CONTENT, true);
    registerInput(FORM_INPUT_TITLE, true);
    registerInput(FORM_INPUT_ACTION, true);
  }, []);

  const [submitted, setSubmitted] = useState<boolean>(false);

  const trySubmit = useCallback(() => setSubmitted(true), [setSubmitted]);
  
  const setContent = useCallback((value: string) => setValue(FORM_INPUT_CONTENT, value, submitted), [setValue, submitted]);
  const setTitle = useCallback((value: string) => setValue(FORM_INPUT_TITLE, value, submitted), [setValue, submitted]);
  const setAction = useCallback((value: string) => setValue(FORM_INPUT_ACTION, value, submitted), [setValue, submitted]);
  
  const submit = useCallback((values) => {
    if (notificationModal.id) {
      dispatch(
        notify({
          id: notificationModal.id,
          content: values.content,
          action: values.action,
          title: values.title
        })
      );
    }
  }, [dispatch, notificationModal.id]);

  return (
    <Dialog baseZIndex={10000000000} onHide={hide} visible={notificationModal.opened} header={header}>
      <form className="notify_editor" onSubmit={handleSubmit(submit)}>
        <GridDashboard>
          <GridCol>
            <GridCol12>
              {error && (
                <GridCol12>
                  <Message type={MessageType.error} summary={error.message} onClose={closeErrorMessage} />
                </GridCol12>
              )}
              <Input
                id={FORM_INPUT_TITLE}
                type="text"
                label="Notification title"
                defaultValue=""
                name={FORM_INPUT_TITLE}
                onChange={setTitle}
                error={errors.title?.message || errors.title?.type}
              />
              <Input
                id={FORM_INPUT_CONTENT}
                type="text"
                label="Content text"
                defaultValue=""
                name={FORM_INPUT_CONTENT}
                onChange={setContent}
                error={errors.content?.message || errors.content?.type}
              />
              <Input
                id={FORM_INPUT_ACTION}
                type="text"
                label="Main action URL"
                defaultValue=""
                name={FORM_INPUT_ACTION}
                onChange={setAction}
                error={errors.action?.message || errors.action?.type}
              />
              <GridCol12>
                <Button onClick={trySubmit} disabled={loading} label={"Notify"} className="p-button-success" icon="pi pi-md-create" />
              </GridCol12>
            </GridCol12>
          </GridCol>
        </GridDashboard>
      </form>
    </Dialog>
  )
}