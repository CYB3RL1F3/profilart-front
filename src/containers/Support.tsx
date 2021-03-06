/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect } from "react";
import { PageLayout } from "components/layouts/PageLayout";
import { Grid, Card, Message } from "components/atoms";
import { GridCol12, GridCol6 } from "components/atoms/Grid";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { Input, Dropdown, Footer } from "components/molecules";
import { AppState } from 'reducers';
import { UserReducer } from 'reducers/user';
import Textarea from "components/molecules/Textarea";
import { Button } from "primereact-working/button";
import { contactSupport, SupportContact, closeErrorSupport, closeSuccessSupport } from "actions/support";

import { SupportReducer } from 'reducers/support';
import { MessageType } from "components/atoms/Message";
import { Link } from "react-router-dom";
import paths from "paths";

export const Support: FC = () => {
  const { profile } = useSelector<AppState, UserReducer>(({ user }) => user);
  const { loading, error, success } = useSelector<AppState, SupportReducer>(({ support }) => support);
  const { handleSubmit, register, setValue, errors, watch } = useForm({
    defaultValues: {
      question: "",
      content: "",
      email: profile?.email
    }
  });
  const doRegistration = useCallback((name: "question" | "content", required: boolean, extraProps?: any) => {
    register({ 
      name
    }, { 
      required,
      ...extraProps
    });
  }, [register]);
  const dispatch = useDispatch();
  const closeMessage = useCallback(() => {
    dispatch(closeSuccessSupport())
  }, [dispatch]);

  const closeError = useCallback(() => {
    dispatch(closeErrorSupport())
  }, [dispatch]);

  
  const submit = useCallback((values) => {
    console.log(values);
    if (!profile?.email && !profile?.artistName) return;
    const finalValues: SupportContact = {
      ...values,
      email: profile?.email,
      name: profile?.artistName
    }
    dispatch(contactSupport(finalValues));
  }, [profile, dispatch]);
  useEffect(() => {
    doRegistration("question", true);
    doRegistration("content", true);
  }, []);
  const setQuestion = useCallback((e) => setValue("question", e.value), [setValue]);
  const setContent = useCallback((value: string) => setValue("content", value), [setValue]);
  const questions = [
    {
      label: "Authentication problems",
      value: "Authentication problems",
    },
    {
      label: "Problem using the API",
      value: "Problem using the API"
    },
    {
      label: "Problem with my profile data",
      value: "Problem with my profile data"
    },
    {
      label: "Problem with data I receive",
      value: "Problem with data I receive"
    },
    {
      label: "Problem with my newsfeed",
      value: "Problem with my newsfeed"
    },
    {
      label: "Problem with cache",
      value: "Problem with cache",
    },
    {
      label: "Other Bug report",
      value: "Other Bug report",
    },
    {
      label: "Other question",
      value: "Other question"
    }
  ]
  
  return (
    <PageLayout className="support">
      <Grid>
        <GridCol6>
          <h1>Need help?</h1>
        </GridCol6>
        {!profile && (
          <GridCol6>
            <p className="goback">
              <Link to={paths.login}>
                back to login form
              </Link>
            </p>
          </GridCol6>
        )}
      </Grid>
      <form onSubmit={handleSubmit(submit)}>
        <Grid>
          <GridCol12>
            <h3>We can bring any assistance! What's your question?</h3>
            <br />
          {success && (
            <Message onClose={closeMessage} type={MessageType.success} summary="Profile successfully updated!!" details="Your infos are now up to date." />
          )}
          {error && (
            <Message onClose={closeError} type={MessageType.error} summary="A fatal error occured!!" details={` ${error.message}. Checkout your informations and retry.`} />
          )}
          </GridCol12>
          <GridCol12>
            <Card className="support_card">
              <Input
                type="email"
                name="email"
                label="your email"
                defaultValue={profile?.email}
                disabled={!!profile && !!profile.email}
              />
              <Input
                type="email"
                name="email"
                label="your name"
                defaultValue={profile?.artistName}
                disabled={!!profile && !!profile.artistName}
              />
              <Dropdown value={watch("question")} options={questions} onChange={setQuestion} filter filterPlaceholder="Search your question" filterBy="label" placeholder="Select a question"/>
              <Textarea
                label="your message"
                onChange={setContent}
                rows={10}
                autoResize
                name="content"
                id="content"
                error={errors.content}
              />
            </Card>
            <Button disabled={loading} label="Send message" className="p-button-success" icon="pi pi-md-create" />
          </GridCol12>
        </Grid>
      </form>
      <Footer />
    </PageLayout>
  )
}