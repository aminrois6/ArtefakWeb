import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { PageHeaderModule } from './../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, 
        MemberRoutingModule, 
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        NgbCarouselModule,
        NgbAlertModule,
    ],
    declarations: [MemberComponent]
})
export class MemberModule {}
