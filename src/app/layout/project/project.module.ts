import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { PageHeaderModule } from '../../shared';
import {NgbModule, NgbActiveModal, NgbModal, NgbPaginationModule, NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, 
        Ng2Charts, 
        ProjectRoutingModule,
         PageHeaderModule, 
         NgbModule, 
         FormsModule, 
         ReactiveFormsModule,
         NgbPaginationModule, 
         NgbAlertModule.forRoot()
    ],
    declarations: [ProjectComponent]
})
export class ProjectModule {}
