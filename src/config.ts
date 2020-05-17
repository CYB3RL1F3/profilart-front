require("dotenv").config();

const {
  REACT_APP_CLOUDINARY_ENDPOINT,
  REACT_APP_CLOUDINARY_SERVER,
  REACT_APP_CLOUDINARY_API_KEY,
  REACT_APP_CLOUDINARY_SECRET,
  REACT_APP_API_ENDPOINT,
  REACT_APP_CLOUDINARY_PRESET
} = process.env;

export const config = {
  cloud: {
    url: REACT_APP_CLOUDINARY_ENDPOINT as string,
    cloud_name: REACT_APP_CLOUDINARY_SERVER as string,
    api_key: REACT_APP_CLOUDINARY_API_KEY as string,
    api_secret: REACT_APP_CLOUDINARY_SECRET as string,
    preset: REACT_APP_CLOUDINARY_PRESET as string
  },
  api: REACT_APP_API_ENDPOINT as string
}

export default config;