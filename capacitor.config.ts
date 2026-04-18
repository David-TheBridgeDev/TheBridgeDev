import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.dramos.app',
  appName: 'dave-home',
  webDir: '../deploy/build/browser',
  server: {
    cleartext: true, // esto habilita HTTP
    androidScheme: 'http', // importante: evita que WebView asuma HTTPS
  },
};

export default config;
