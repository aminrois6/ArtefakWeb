import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtefakscrumComponent } from './artefakscrum.component';

const routes: Routes = [
    {
        path: '', component: ArtefakscrumComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArtefakscrumRoutingModule {
}
