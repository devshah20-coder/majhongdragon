import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.dragonmind.mahjong",
  appName: "DragonMind Mahjong",
  webDir: "mobile-shell",
  server: {
    androidScheme: "https"
  },
  plugins: {
    SplashScreen: {
      backgroundColor: "#071421",
      launchShowDuration: 1400
    }
  }
};

export default config;
