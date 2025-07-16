import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {environment} from '../environments/environment.development';
import {authInterceptor} from './interceptor/auth.interceptor';
import {JwtModule} from '@auth0/angular-jwt';
import {ServeErrorsInterceptor} from './interceptor/server-error.interceptor';


export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    importProvidersFrom(
      JwtModule.forRoot({
        config:{
          tokenGetter: tokenGetter,
          allowedDomains:["localhost:6161"],
          disallowedRoutes:["https://localhost:6161/login/forget"]
        },
      })
    ),
    {provide:HTTP_INTERCEPTORS,
    useClass: ServeErrorsInterceptor,
    multi: true
    }
  ]
};
