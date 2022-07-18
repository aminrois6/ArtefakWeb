import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { ShareComponent } from './share.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, ShareRoutingModule, PageHeaderModule],
    declarations: [ShareComponent]
})
export class ShareModule {}
