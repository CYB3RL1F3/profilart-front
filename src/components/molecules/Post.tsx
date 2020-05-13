import React, { useCallback, FC } from "react";
import { Post } from 'types/Posts';
import { Grid, GridCol6 } from 'components/atoms/Grid';
import { PostActionsBar } from "components/atoms";
import { useDispatch } from "react-redux";
import { deletePost, togglePublish } from "actions/post";
import { openFormModal } from 'actions/post';
import { parseHtml } from "utils/html";
import {Message} from 'primereact-working/message';
import PlaceholderImage from "style/images/placeholder.png";

interface PostElementProps {
  post: Post;
}

const PostElement: FC<PostElementProps> = ({ post }) => {
  const dispatch = useDispatch();

  const deletePostAction = useCallback(() => {
    dispatch(deletePost(post._id));
  }, [dispatch, post._id]);

  const editPostAction = useCallback(() => {
    dispatch(openFormModal(post._id));
  }, [dispatch, post._id]);

  const togglePublication = useCallback(() => {
    dispatch(togglePublish({
      id: post._id,
      post
    }));
  }, [dispatch, post]);
  return (
      <Grid>
        <GridCol6 className="post">
          <h3>
            {post.title} {post.subtitle && (<i>{`(${post.subtitle})`}</i>)}
          </h3>
          <div className="content_post">
            {post.content && parseHtml(post.content)}
          </div>
        </GridCol6>
        <GridCol6 className="picture">
          <div className="actions">
            <div className="message__handle" onClick={togglePublication}>
              {post.published ? (
                <Message severity="success" text="Published" />
              ) : (
                <Message severity="info" text="Draft" />
              )}
            </div>

            <PostActionsBar onDelete={deletePostAction} onEdit={editPostAction} />
          </div>
          <p>
            <img src={post.illustration || PlaceholderImage} alt={post.title} />
          </p>
        </GridCol6>
      </Grid>
  );
}

export const PostComponent = (post: Post) => <PostElement post={post} />
export default PostComponent;