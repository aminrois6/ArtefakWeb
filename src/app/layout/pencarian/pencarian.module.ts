import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PencarianRoutingModule } from './pencarian-routing.module';
import { PencarianComponent } from './pencarian.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule, 
        PencarianRoutingModule, 
        PageHeaderModule,
        FormsModule
    ],
    declarations: [PencarianComponent]
})
export class PencarianModule {}
