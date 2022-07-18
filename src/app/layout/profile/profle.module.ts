import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { PageHeaderModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule, 
        ProfileRoutingModule, 
        PageHeaderModule,
        FormsModule
    ],
    declarations: [ProfileComponent]
})
export class ProfileModule {}
