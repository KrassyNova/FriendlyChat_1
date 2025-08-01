import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore, getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { provideFunctions, getFunctions, connectFunctionsEmulator } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { getApp } from '@angular/fire/app';
import {
  ReCaptchaEnterpriseProvider,
  initializeAppCheck,
  provideAppCheck,
} from '@angular/fire/app-check';

declare global {
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean;
}

// @NgModule({
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     CommonModule,
//     FormsModule,
//     provideFirebaseApp(() => initializeApp(environment.firebase)),
//     provideAppCheck(() => {
//       const appCheck = initializeAppCheck(getApp(), {
//         provider: new ReCaptchaEnterpriseProvider(
//           environment.reCAPTCHAEnterpriseKey.key
//         ),
//         isTokenAutoRefreshEnabled: true,
//       });
//       if (location.hostname === 'localhost') {
//         self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
//       }
//       return appCheck;
//     }),]
// })

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAppCheck(() => {
      const appCheck = initializeAppCheck(getApp(), {
        provider: new ReCaptchaEnterpriseProvider(
          environment.reCAPTCHAEnterpriseKey.key
        ),
        isTokenAutoRefreshEnabled: true,
      });
      if (location.hostname === 'localhost') {
        self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      }
      return appCheck;
    }),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    provideMessaging(() => getMessaging()),
    provideRouter(routes)
  ],
};
