import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtefakscrumRoutingModule } from './artefakscrum-routing.module';
import { ArtefakscrumComponent } from './artefakscrum.component';
import { PageHeaderModule } from './../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ArtefakscrumRoutingModule, 
        PageHeaderModule,
        FormsModule,
    ],
    declarations: [ArtefakscrumComponent]
})
export class ArtefakscrumModule {}
