
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
  clientId: string;
  clientSecret: string;
}

export interface DiscogsProfile {
  artistId: number;
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
  password?: string;
  newPassword?: string;
  email?: string;
  newEmail?: string;
  totalReplace?: boolean;
  token?: boolean;
}

export interface DeletedStatus {
  delete: string;
}

export type CreateProfilePayload = Omit<ProfileData, "uid"> & Credentials;