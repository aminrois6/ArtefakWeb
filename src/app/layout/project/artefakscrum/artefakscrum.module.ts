import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtefakscrumRoutingModule } from './artefakscrum-routing.module';
import { ArtefakscrumComponent } from './artefakscrum.component';
import { PageHeaderModule } from './../../../shared';

@NgModule({
    imports: [CommonModule, ArtefakscrumRoutingModule, PageHeaderModule],
    declarations: [ArtefakscrumComponent]
})
export class ArtefakscrumModule {}
