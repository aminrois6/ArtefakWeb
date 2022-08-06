import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';

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
        TranslateModule,
        LoginRoutingModule,
        FormsModule,
        NgxSpinnerModule,  
        SocialLoginModule,
        ],
    declarations: [LoginComponent]
})
export class LoginModule {}
