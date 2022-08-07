import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PencarianComponent } from './pencarian.component';

const routes: Routes = [
    {
        path: '',
        component: PencarianComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PencarianRoutingModule {}
