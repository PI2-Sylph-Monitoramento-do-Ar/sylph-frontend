import "dotenv/config";

export default {
  expo: {
    name: "sylph-frontend",
    slug: "sylph-frontend",
    version: "1.0.0",
    scheme: "com.sylph_fga.app",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.sylph_fga.app",
      buildNumber: "3",
    },
    android: {
      package: "com.sylph_fga.app",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      firebase_api_key: process.env.FIREBASE_API_KEY,
      firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
      firebase_project_id: process.env.FIREBASE_PROJECT_ID,
      firebase_storage_bucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebase_messaging_sender_id: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebase_app_id: process.env.FIREBASE_APP_ID,
      firebase_measurement_id: process.env.FIREBASE_MEASUREMENT_ID,
      client_id: process.env.CLIENT_ID,
      url: process.env.URL,
    },
  },
};
