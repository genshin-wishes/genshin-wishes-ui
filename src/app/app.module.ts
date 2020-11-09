import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from './auth/auth.module';
import { BaseComponent } from './core/base/base.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { NavComponent } from './core/nav/nav.component';
import { LandingModule } from './core/landing/landing.module';
import { ToastrModule } from 'ngx-toastr';
import { WishesModule } from './wishes/wishes.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SettingsModule } from './settings/settings.module';
import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from 'ngx-google-analytics';
import { environment } from '../environments/environment';
import { CookieConsentComponent } from './core/cookie-consent/cookie-consent.component';
import { CookieService } from 'ngx-cookie-service';

import '@angular/common/locales/global/fr';
import { LangService } from './shared/lang.service';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(
    http,
    './assets/locale/',
    '.json?v=' + Date.now()
  );
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
    MarkdownModule.forRoot(),
    ToastrModule.forRoot({ newestOnTop: false, enableHtml: true }),
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    FontAwesomeModule,
    NgxGoogleAnalyticsModule.forRoot(environment.ga),
    NgxGoogleAnalyticsRouterModule,
    // Ours
    SharedModule,
    AuthModule,
    DashboardModule,
    LandingModule,
    WishesModule,
    SettingsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useFactory: (lang: LangService) => lang.getCurrentLang(),
      deps: [LangService],
    },
    CookieService,
  ],
  declarations: [
    AppComponent,
    BaseComponent,
    NavComponent,
    CookieConsentComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
