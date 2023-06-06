import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "fr.carbonit.app",
  appName: "Carbon",
  webDir: "dist/apps/frontend",
  server: {
    androidScheme: "https",
  },
  android: {
    allowMixedContent: true,
  },
  plugins: {
    SplashScreen: {
      androidScaleType: "CENTER_CROP",
      launchShowDuration: 1000,
    },
  },
};

export default config;
