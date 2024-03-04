import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '688970826393-7en65tgpn0qngnttjg2ve4174verja69.apps.googleusercontent.com'
    }
  },
  appId: 'biz.pacifish',
  appName: 'quizQuest',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
