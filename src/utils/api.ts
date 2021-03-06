import { OutgoingHttpHeaders } from "http";
import store from "store";
import { Params } from "types/Api";

export const getTokenHeader = (token: string | null) => !!token ? `Bearer ${token}` : undefined;

export const getToken = () => getTokenHeader(store.getState().user.token)

export const getHeaders = <Options = {}>(toBeAuthenticated?: boolean, extraOptions?: Options) => {
  const headers: OutgoingHttpHeaders = {
    "Content-Type": "application/json",
    ...extraOptions
  }
  if (toBeAuthenticated) {
    const token = getToken();
    if (token) {
      headers.authorization = token;
    } else {
      throw new Error('no authenticated');
    }
  }
  return headers;
}

export const toQuery = (params?: Params) => params ? `?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}` : ''

export const toBase64 = (file: Blob) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});