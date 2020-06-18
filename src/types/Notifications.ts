import { APIError } from 'types/Api';
export interface Notification {
  message: string;
  date: string;
  sent: boolean;
}

export interface NotificationArgs {
  content: string;
  id: string;
}

export interface SubscriptionKeys {
  auth: string;
  p256dh: string;
};

export interface SubscriptionArgs extends SubscriptionKeys {
  id: string;
  endpoint: string;
}

export interface Subscription {
  keys: SubscriptionKeys;
  endpoint: string;
}

export interface NotificationCenterArgs {
  email: string;
  gcmApiKey: string;
  website: string;
}

export interface NotificationCenter extends NotificationCenterArgs {
  id: string;
  publicKey: string;
  privateKey: string;
  subscriptions: Subscription[];
  notifications: Notification[];
}

export interface SubscriptionConfirmed {
  subscribed: boolean;
}

export interface NotificationCenterReducer {
  notificationCenters: NotificationCenter[];
  loading: boolean;
  success: boolean;
  addSuccess: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
  notifySuccess: boolean;
  error: APIError;
  modal: {
    opened: boolean;
    new: boolean;
    id: string | null
  };
  notificationModal: {
    opened: boolean;
    id: string | null;
  }
}