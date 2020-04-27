import React, { FC, useState, useCallback } from "react";
import classnames from "classnames";

export enum MessageType {
  error = "error",
  success = "success"
}
export interface MessageProps {
  summary: string;
  details?: string;
  type: MessageType;
  onClose?: () => void;
}

export const Message: FC<MessageProps> = ({ onClose, summary, details, type }) => {

  const [hidden, toggle] = useState(false);
  const classname = classnames({
    "p-messages": true,
    "p-component": true,
    "p-messages-success": type === MessageType.success,
    "p-messages-error": type === MessageType.error,
    "p-messages-exit": hidden,
    "p-messages-exit-active": hidden
  });

  const iconClassname = classnames({
    "p-messages-icon": true,
    "pi": true,
    "pi-times": type === "error",
    "pi-check": type === "success"
  });

  const close = useCallback(() => {
    toggle(true);
    onClose && onClose();
  }, [toggle, onClose]);
  return (
    <div>
      <div className={classname}>
        <div className="p-messages-wrapper">
          <button onClick={close} type="button" className="p-messages-close p-link">
            <i className="p-messages-close-icon pi pi-times"></i>
          </button>
          <span className={iconClassname}></span>
          <ul>
            <li>
              <span className="p-messages-summary">{summary}</span>
              {details && (<span className="p-messages-detail">{details}</span>)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Message;