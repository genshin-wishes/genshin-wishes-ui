import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SecurityContext } from '@angular/core';

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

import '@angular/common/locales/global/fr';
import { CoreModule } from './core/core.module';

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
    MarkdownModule.forRoot({ sanitize: SecurityContext.STYLE }),
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
