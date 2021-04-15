import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SecurityContext } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from './auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth/auth.interceptor';
import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from 'ngx-google-analytics';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';

import { CoreModule } from './core/core.module';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import '@angular/common/locales/global/de';
import '@angular/common/locales/global/en';
import '@angular/common/locales/global/fr';
import '@angular/common/locales/global/pl';
import '@angular/common/locales/global/ru';
import '@angular/common/locales/global/th';
import '@angular/common/locales/global/zh';

export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return {
    getTranslation(lang: string): Observable<unknown> {
      return combineLatest([
        http.get(`/i18n/${lang}/site.json`).pipe(catchError(() => of({}))),
        http.get(`/i18n/${lang}/items.json`).pipe(catchError(() => of({}))),
      ]).pipe(map(([site, items]) => ({ ...site, items })));
    },
  };
}

export function createMissingTranslationHandler(): MissingTranslationHandler {
  return {
    handle(params: MissingTranslationHandlerParams): Observable<string> {
      return params.translateService.getTranslation('en-US').pipe(
        exhaustMap((english) => {
          return (
            (english &&
              params.translateService.parser.getValue(english, params.key) !=
                undefined &&
              (params.translateService.getParsedResult(
                english,
                params.key,
                params.interpolateParams
              ) as Observable<string>)) ||
            of(params.key)
          );
        })
      );
    },
  };
}

@NgModule({
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    // 3rd party
    FlexLayoutModule.withConfig({
      useColumnBasisZero: false,
      addFlexToParent: true,
    }),
    MarkdownModule.forRoot({ sanitize: SecurityContext.STYLE }),
    ToastrModule.forRoot({ newestOnTop: false, enableHtml: true }),
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: createMissingTranslationHandler,
      },
    }),
    FontAwesomeModule,
    NgxGoogleAnalyticsModule.forRoot(environment.ga),
    NgxGoogleAnalyticsRouterModule,
    // Ours
    AuthModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    CookieService,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
