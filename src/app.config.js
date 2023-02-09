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
      bundleIdentifier: "com.sylph.fga.app",
      config: { googleMapsApiKey: process.env.MAP_API_KEY_IOS },
      supportsTablet: true,
      buildNumber: "3",
    },
    android: {
      config: {
        googleMaps: { apiKey: process.env.MAP_API_KEY_ANDROID },
      },
      package: "com.sylph.fga.app",
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
      client_id_android: process.env.CLIENT_ID_ANDROID,
      client_id_ios: process.env.CLIENT_ID_IOS,
      client_id_expo: process.env.CLIENT_ID_EXPO,
      url: process.env.URL,
      eas: {
        projectId: process.env.EAS,
      },
    },
  },
};
