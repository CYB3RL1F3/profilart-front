import config from 'config';

export const CALL: "API/CALL" = "API/CALL";
export const CALL_SUCCESS: "API/CALL_SUCCESS" = "API/CALL_SUCCESS";
export const CALL_FAIL: "API/CALL_FAIL" = "API/CALL_FAIL";
export const CALL_CLEAR: "API/CLEAR" = "API/CLEAR";
export const CALL_CLOSE_ERROR: "API/CLOSE_ERROR" = "API/CLOSE_ERROR";

export const GET_STATUS: "API/GET_STATUS" = "API/GET_STATUS";
export const GET_STATUS_SUCCESS: "API/GET_STATUS_SUCCESS" = "API/GET_STATUS_SUCCESS";
export const GET_STATUS_FAIL: "API/GET_STATUS_FAIL" = "API/GET_STATUS_FAIL";

// export const BASE_URL: "https://profilart.fr" = "https://profilart.fr";
export const BASE_URL = config.api;

export const CLOUDINARY_URL = "cloudinary://891429771893345:Rr5TYQWMCB9cxASxbth6nT7-m4w@hw2jydiif";