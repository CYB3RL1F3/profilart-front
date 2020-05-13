import React, { FC, Suspense, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostsReducer } from 'reducers/posts';
import { AppState } from "reducers";
import { UserReducer } from 'reducers/user';
import { LoadingPosts } from 'components/molecules';
import { PostsList } from 'components/templates/PostsList';
import { getPosts, closePostNotif, openFormModal } from "actions/post";
import { PageLayout } from "components/layouts/PageLayout";
import { Grid, GridCol6, GridCol12 } from "components/atoms/Grid";
import { Button } from "primereact-working/button";
import { Message } from "components/atoms";
import { MessageType } from "components/atoms/Message";
import { PostForm } from "components/templates/PostForm";

export const Posts: FC = () => {
  const dispatch = useDispatch();
  const { posts, loading, addSuccess, updateSuccess, deleteSuccess, modal } = useSelector<AppState, PostsReducer>(({ posts }) => posts);
  const { profile } = useSelector<AppState, UserReducer>(({ user }) => user);

  const promise = useMemo(() => {
    if (profile && profile.uid) {
      return dispatch(getPosts(profile.uid));
    }
  }, [dispatch, profile]);

  const getFetchedPosts = useCallback(() => {
    if (loading || !posts) {
      throw promise;
    }
    return posts;
  }, [posts, loading, promise]);

  const openForm = useCallback(() => {
    dispatch(openFormModal(null));
  }, [dispatch]);

  const closeMessage = useCallback(() => {
    dispatch(closePostNotif());
  }, [dispatch]);

  const drafts = useMemo(() => posts.filter(p => !p.published), [posts]);

  return (
    <PageLayout className="postsPage">
      <Grid>
        <GridCol12 className="p-grid">
          <GridCol6>
            <h1>Your personal newsfeed</h1>
          </GridCol6>
          <GridCol6 className="button_handler">
            <Button className="p-button-success" onClick={openForm} label="Create post" icon="pi pi-plus" />
          </GridCol6>
        </GridCol12>
      </Grid>
      <Grid className="messages">
        <p>Additionnaly to data from popular APIs, you can manage custom posts on a newsfeed for your website or apps.</p><br />
        {posts.length > 0 && (
          <p>Your feed actually contains <strong>{posts.length} posts</strong>{drafts.length > 0 ? `, including ${drafts.length} drafts.` : "."}</p>
        )}
      </Grid>
      <Grid className="messages">
        {addSuccess && (
          <Message onClose={closeMessage} type={MessageType.success} summary="Post successfully added!" />
        )}
        {updateSuccess && (
          <Message onClose={closeMessage} type={MessageType.success} summary="Post successfully updated!" />
        )}
        {deleteSuccess && (
          <Message onClose={closeMessage} type={MessageType.success} summary="Post successfully deleted!" />
        )}
      </Grid>
      <Grid className="messages">
        <Suspense fallback={<LoadingPosts />}>
          <PostsList posts={getFetchedPosts} />
        </Suspense>
      </Grid>
      {modal.opened && (<PostForm />)}
    </PageLayout>
  );
}

export default Posts;