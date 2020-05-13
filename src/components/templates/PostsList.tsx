import React, { FC, useMemo } from "react";
import { Post } from 'types/Posts';
import { Grid } from "components/atoms";
import { PostComponent } from "components/molecules";
import {DataView} from 'primereact-working/dataview';

export interface PostsListProps {
  posts: () => Post[];
}

export const PostsList: FC<PostsListProps> = ({ posts }) => {
  const data = useMemo(() => posts(), [posts]);
  const nbRows = useMemo(() => data.length, [data]);
  if (data.length) return (
    <Grid>
      <DataView
        value={data} 
        itemTemplate={PostComponent}
        rows={nbRows}
        lazy
        emptyMessage="No posts yet !!"
      />
    </Grid>
  );
  return <p>No posts yet !!</p>;
}
export default PostsList;