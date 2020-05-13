import React, { FC, useCallback, useState } from "react";
import { Dialog } from "primereact-working/dialog";
import { Button } from "primereact-working/button";

export interface PostActionsBarProps {
  onDelete: () => void;
  onEdit: () => void;
}

export const PostActionsBar: FC<PostActionsBarProps> = ({ onDelete, onEdit }) => {
  const editAction = useCallback((e) => {
    e.preventDefault();
    onEdit()
  }, [onEdit]);
  const [askingToDelete, askToDelete] = useState<boolean>(false);
  const askDeletionConfirmation = useCallback((e) => {
    e.preventDefault();
    askToDelete(true);
  }, [askToDelete]);
  const onHide = useCallback(() => {
    askToDelete(false);
  }, [askToDelete]);
  const deleteAction = useCallback((e) => {
    e.preventDefault();
    onDelete();
    onHide();
  }, [onDelete, onHide]);
  
  return (
    <div className="actionBar">
      <a href="./edit" className="edit" onClick={editAction}>
        <span className="pi pi-pencil" />
      </a>
      <a href="./delete" className="delete" onClick={askDeletionConfirmation}>
        <span className="pi pi-trash" />
      </a>
      <Dialog
        visible={askingToDelete}
        header="Are you sure you want to remove this post?"
        onHide={onHide}
        footer={(
            <div>
                <Button label="Yes" icon="pi pi-check" onClick={deleteAction} />
                <Button label="No" icon="pi pi-times" onClick={onHide} />
            </div>
        )}
      >
        Post deletion is definitive. This post can't be rollback once erased.
      </Dialog>
    </div>
  )
};

export default PostActionsBar;