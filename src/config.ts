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
    url: REACT_APP_CLOUDINARY_ENDPOINT || "https://api.cloudinary.com/v1_1/hw2jydiif",
    cloud_name: REACT_APP_CLOUDINARY_SERVER || "hw2jydiif",
    api_key: REACT_APP_CLOUDINARY_API_KEY || "891429771893345",
    api_secret: REACT_APP_CLOUDINARY_SECRET || "Rr5TYQWMCB9cxASxbth6nT7-m4w",
    preset: REACT_APP_CLOUDINARY_PRESET || "bcvh9q4a"
  },
  api: REACT_APP_API_ENDPOINT || "https://profilart.fr/"
}

export default config;