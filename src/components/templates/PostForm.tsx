/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useMemo, useEffect, useState } from "react";
import { Dialog } from "primereact-working/dialog";
import { useDispatch, useSelector } from "react-redux";
import { closeFormModal, updatePost, createPost, uploadPic, closeErrorNotif } from 'actions/post';
import { AppState } from 'reducers';
import { PostsReducer } from 'reducers/posts';
import { Post } from 'types/Posts';
import { UserReducer } from '../../reducers/user';
import { useForm } from "react-hook-form";
import { FORM_INPUT_TITLE, FORM_INPUT_SUBTITLE, FORM_INPUT_CONTENT, FORM_INPUT_ILLUSTRATION, FORM_INPUT_PUBLISHED } from "constants/post";
import { GridCol, GridDashboard, GridCol12, GridCol6 } from "components/atoms/Grid";
import { Input, Editor } from "components/molecules";
import { Button } from "primereact-working/button";
import Switch from '../molecules/Switch';
import { Message } from "components/atoms";
import { MessageType } from "components/atoms/Message";

type Field = "title" | "subtitle" | "illustration" | "published" | "content";
export const PostForm: FC = () => {

  const dispatch = useDispatch();
  const hide = useCallback(() => {
    dispatch(closeFormModal());
  }, [dispatch]);

  const closeErrorMessage = useCallback(() => {
    dispatch(closeErrorNotif());
  }, [dispatch]);
  
  const [uploading, toggleUpload] = useState<boolean>(false);
  const { posts, modal, loading, error } = useSelector<AppState, PostsReducer>(({ posts }) => posts);
  const { profile } = useSelector<AppState, UserReducer>(({ user }) => user);
  let currentPost: Post | null = null;
  if (modal.opened && modal.postId) {
    currentPost = posts.find(p => p._id === modal.postId) || null;
  }
  const header: string = useMemo(() => !!currentPost ? `Update post #${currentPost._id}` : "Create a post", [currentPost]);
  const { handleSubmit, register, setValue, errors, setError, watch } = useForm<any, any>({
    defaultValues: {
      [FORM_INPUT_TITLE]: currentPost?.title || "",
      [FORM_INPUT_SUBTITLE]: currentPost?.subtitle || "",
      [FORM_INPUT_ILLUSTRATION]: currentPost?.illustration || "",
      [FORM_INPUT_PUBLISHED]: currentPost?.published || false,
      [FORM_INPUT_CONTENT]: currentPost?.content || ""
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

  const published = watch(FORM_INPUT_PUBLISHED, false);
  const submitLabel = useMemo(() => published ? "Publish" : "Save Draft", [published]);

  useEffect(() => {
    registerInput(FORM_INPUT_TITLE, true);
    registerInput(FORM_INPUT_SUBTITLE, false);
    registerInput(FORM_INPUT_CONTENT, true);
    registerInput(FORM_INPUT_ILLUSTRATION, false);
    registerInput(FORM_INPUT_PUBLISHED, false);
  }, []);

  const [submitted, setSubmitted] = useState<boolean>(false);

  const trySubmit = useCallback(() => setSubmitted(true), [setSubmitted]);
  
  const setTitle = useCallback((value: string) => setValue(FORM_INPUT_TITLE, value, submitted), [setValue, submitted]);
  const setSubtitle = useCallback((value: string) => setValue(FORM_INPUT_SUBTITLE, value, false), [setValue]);
  const setContent = useCallback((value: string) => setValue(FORM_INPUT_CONTENT, value, submitted), [setValue, submitted]);
  const setIllustration = useCallback(async (value: string) => {
    if (value) {
      toggleUpload(true);
      try {
        const input = document.getElementById(FORM_INPUT_ILLUSTRATION) as any;
        const result = await uploadPic(input?.files[0]);
        toggleUpload(false);
        if (result.status === 200) setValue(FORM_INPUT_ILLUSTRATION, result.data.url, false);
        else setError(FORM_INPUT_ILLUSTRATION, "upload error");
      } catch(e) {
        console.log(e);
        toggleUpload(false);
        setError(FORM_INPUT_ILLUSTRATION, "upload error");
      }
      
    }
  }, [setError, setValue]);

  const togglePublicationStatus = useCallback((value: boolean) => setValue(FORM_INPUT_PUBLISHED, value), [setValue])
  
  const setIllustrationLink = useCallback((value: string) => {
    setValue(FORM_INPUT_ILLUSTRATION, value, false);
  }, [setValue])

  const submit = useCallback((values) => {
    if (!!currentPost) {
      dispatch(updatePost({
        id: currentPost._id,
        post: values
      }));
    } else {
      dispatch(createPost({
        ...values,
        authorId: profile?.uid
      }));
    }
  }, [currentPost, dispatch, profile]);

  return (
    <Dialog onHide={hide} visible={modal.opened} header={header}>
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
                id={FORM_INPUT_TITLE}
                type="text"
                label="Title"
                defaultValue={currentPost?.title}
                name={FORM_INPUT_TITLE}
                onChange={setTitle}
                error={errors.title?.message || errors.title?.type}
              />
              <Input
                id={FORM_INPUT_SUBTITLE}
                type="text"
                label="Short description / Preview"
                defaultValue={currentPost?.subtitle}
                name={FORM_INPUT_SUBTITLE}
                onChange={setSubtitle}
                error={errors.subtitle?.message || errors.subtitle?.type}
              />
              <GridCol6>
                <p>Upload image:</p>
              </GridCol6>
              
              <Input
                id={FORM_INPUT_ILLUSTRATION}
                type="file"
                label=""
                disabled={uploading}
                name={FORM_INPUT_ILLUSTRATION}
                onChange={setIllustration}
                error={errors.subtitle?.message || errors.subtitle?.type}
              />
              <GridCol6>
                {uploading && (
                  <>
                    <span className="pi pi-spinner" />
                     uploading...
                  </>
                )}
              </GridCol6>
              <Input
                type="text"
                label="Or put picture URL here"
                disabled={uploading}
                name={FORM_INPUT_ILLUSTRATION}
                onChange={setIllustrationLink}
              />
              <Editor 
                label="Edit content:" 
                height="320px" 
                width="100%"
                onChange={setContent} 
                value={currentPost?.content}
              />
              <Switch 
                id={FORM_INPUT_PUBLISHED}
                label="Publish on the feed"
                onChange={togglePublicationStatus} 
                defaultChecked={currentPost?.published}
              />
              <GridCol12>
                <Button onClick={trySubmit} disabled={loading} label={submitLabel} className="p-button-success" icon="pi pi-md-create" />
              </GridCol12>
            </GridCol12>
          </GridCol>
        </GridDashboard>
      </form>
    </Dialog>
  )
}