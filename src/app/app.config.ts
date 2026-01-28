import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { LoginModuleModule } from './login/login-module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HttpHeaderInterceptorService } from './authentication/interceptors/http-header-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideClientHydration(),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule,LoginModuleModule]),
    //provideHttpClient(withFetch()),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    {provide : HTTP_INTERCEPTORS, useClass : HttpHeaderInterceptorService, multi: true},


  ]
};
