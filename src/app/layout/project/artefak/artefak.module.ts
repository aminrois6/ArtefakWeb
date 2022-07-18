import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { ArtefakRoutingModule } from './artefak-routing.module';
import { ArtefakComponent } from './artefak.component';
import { PageHeaderModule } from './../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, 
        ArtefakRoutingModule, 
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        NgbCarouselModule,
        NgbAlertModule,
    ],
    declarations: [ArtefakComponent]
})
export class ArtefakModule {}
