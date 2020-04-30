export interface Params {
  [key: string]: string | number | boolean;
}

export type APIError = {
  code: number;
  message: string;
  fromApi: boolean;
} | null;