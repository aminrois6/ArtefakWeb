import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { Urlservice } from './shared/services/url.service';
import { ImageService } from './shared/services/image.service';

const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new  GoogleLoginProvider('757818047781-63p11bmrcdq043djj1415vou55887rla.apps.googleusercontent.com')
    },
    ] );
    
    export function provideConfig(){
      return config;
    }
    

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NgbModule,
        NgbPaginationModule, 
        NgbAlertModule,
        NgxSpinnerModule,    
        SocialLoginModule,
    ],
    declarations: [AppComponent],
    providers: [AuthGuard, DecimalPipe, Urlservice, ImageService,
        {provide: AuthServiceConfig, useFactory: provideConfig}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
