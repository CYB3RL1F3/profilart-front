
export interface Encryption {
  N: number;
  r: number;
  p: number;
}

export interface ResidentAdvisorProfile {
  DJID: string;
  accessKey: string;
  userId: string;
}

export interface SoundcloudProfile {
  id: string;
  url: string;
  playlists?: string[];
}

export interface DiscogsProfile {
  url: string;
}

export interface MailerProfile {
  use: string;
  recipient: string;
  prefix: string;
  mailgun: {
    email: string;
    user: string;
    endpoint: string;
  };
}

export interface ProfileData {
  artistName: string;
  website?: string;
  uid: string;
  residentAdvisor?: ResidentAdvisorProfile;
  soundcloud?: SoundcloudProfile;
  discogs?: DiscogsProfile;
  mailer?: MailerProfile;
}

export interface Profile extends ProfileData {
  token?: string;
  email: string;
  cache?: {
    use: boolean;
    ttl: {
      [service: string]: number;
    };
  };
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UpdateProfilePayload extends ProfileData {
  password: string;
  newPassword?: string;
  email: string;
  newEmail?: string;
  totalReplace?: boolean;
  cache?: {
    use: boolean;
    ttl: {
      [service: string]: number;
    };
  };
}

export interface UpdateProfileFormData extends UpdateProfilePayload {
  confirmPassword: string;
}

export interface DeletedStatus {
  delete: string;
}

export type CreateProfilePayload = Omit<ProfileData, "uid"> & Credentials;

export interface CreateProfileFormData extends CreateProfilePayload {
  confirmPassword?: string;
}