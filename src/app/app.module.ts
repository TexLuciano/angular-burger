import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { authorizationGuard } from './guard/authorization.guard';
import { ServiceInterceptor } from './auth/service.interceptor';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PagesModule,
    RouterModule
  ],
  providers: [
    authorizationGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ServiceInterceptor, multi: true },
    {
      provide: LOCALE_ID,
      useValue: 'pt-PT',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
