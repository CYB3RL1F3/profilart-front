import React, { FC, useCallback } from "react";
import { Button } from "primereact/button";
import {Dialog} from 'primereact/dialog';
import { Grid } from "components/atoms";

export interface ConfirmDeletionModalProps {
  opened: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  website?: string;
  uid: string;
}

export const ConfirmDeletionModal: FC<ConfirmDeletionModalProps> = ({ opened, uid, onConfirm, onCancel, onClose, website }) => {
  const confirm = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);
  const cancel = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onCancel();
    onClose();
  }, [onCancel, onClose]);
  
  const Footer = (
    <div>
        <Button className="p-button-info" label="No, finally cancel the action" icon="pi pi-times" onClick={cancel} />
        <Button className="p-button-danger" label="Yes, I want to delete my profile and assume consequences..." icon="pi pi-check" onClick={confirm} />
    </div>
  );
  return (
    <Dialog header="ARE YOU REALLY SURE THAT YOU WANT TO DELETE YOUR PROFILE?" footer={Footer} visible={opened} style={{width: '60vw', minWidth: '750px'}} modal={true} onHide={onClose}>
      <Grid className="deletion">
        <h1><span className="pi pi-md-warning" />This action is <strong>IRREVERSIBLE!!</strong></h1>
        <p>After doing this, <strong>it won't be possible to rollback.</strong> All data stored on our databases, including <strong>your UID, email, password, API routes and credentials are simply <u>ERASED</u></strong>, in accordance with GPDR and general conditions of use.</p>
        <p>It takes only few seconds for us to delete everything and have immediate effects on the API. This action is consequently <strong>highly risky</strong> if you're still using Profilart with your UID {uid} in your apps, websites, services...</p>
        <p>If you delete your profile, <strong>your website {!!website && (<a href={website}>{website}</a>)} or any web and mobile application currently</strong> using your profilart API endpoint in production <strong>won't work properly anymore and might meet strong bugs if you're still consuming the service!!!</strong></p>
        <p>Please checkout your apps and ensure about what you're doing before confirming this deletion!!</p>
        <p><strong>THERE IS ABSOLUTELY NO ROLLBACK POSSIBLE AFTER THIS !!!</strong></p>
        <p>Contacting support would be pointless, nothing can be done when the profile is deleted...</p>
        <p></p>
        <p>Are you SURE that you <strong>REALLY WANT</strong> to <strong>definitively DELETE</strong> your profile from Profilart?</p>
      </Grid>
    </Dialog>
  )
}