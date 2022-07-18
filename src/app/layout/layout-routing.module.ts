import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'project', pathMatch: 'prefix' },
            { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
            // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'share', loadChildren: () => import('./share/share.module').then(m => m.ShareModule) },
            { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) },
            { path: 'member', loadChildren: () => import('./project/member/member.module').then(m => m.MemberModule) },
            { path: 'artefak', loadChildren: () => import('./project/artefak/artefak.module').then(m => m.ArtefakModule) },
            { path: 'artefakscrum', loadChildren: () => import('./project/artefakscrum/artefakscrum.module').then(m => m.ArtefakscrumModule) },
            { path: 'profile', loadChildren: () => import('./profile/profle.module').then(m => m.ProfileModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
