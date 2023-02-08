import Constants from "expo-constants";

// FIREBASE
export const FIREBASE_API_KEY = Constants?.manifest?.extra?.firebase_api_key;
export const FIREBASE_AUTH_DOMAIN =
  Constants?.manifest?.extra?.firebase_auth_domain;
export const FIREBASE_PROJECT_ID =
  Constants?.manifest?.extra?.firebase_project_id;
export const FIREBASE_STORAGE_BUCKET =
  Constants?.manifest?.extra?.firebase_storage_bucket;
export const FIREBASE_MESSAGING_SENDER_ID =
  Constants?.manifest?.extra?.firebase_messaging_sender_id;
export const FIREBASE_APP_ID = Constants?.manifest?.extra?.firebase_app_id;
export const FIREBASE_MEASUREMENT_ID =
  Constants?.manifest?.extra?.firebase_measurement_id;

// APP
export const APP_SCHEME = Constants?.manifest?.extra?.app_scheme;

// AUTH

export const CLIENT_ID = Constants?.manifest?.extra?.client_id;
export const CLIENT_ID_ANDROID = Constants?.manifest?.extra?.client_id_android;
export const CLIENT_ID_IOS = Constants?.manifest?.extra?.client_id_ios;
export const CLIENT_ID_EXPO = Constants?.manifest?.extra?.client_id_expo;

// URL

export const URL = Constants?.manifest?.extra?.url;
