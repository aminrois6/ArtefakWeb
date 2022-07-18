import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

@Component({
    selector: 'app-artefak',
    templateUrl: './artefakscrum.component.html',
    styleUrls: ['./artefakscrum.component.scss'],
    animations: [routerTransition()]
})
export class ArtefakscrumComponent implements OnInit {
    dataproject:any;
    constructor() {}

    ngOnInit() {
        this.dataproject=JSON.parse(localStorage.getItem('dataproject'));
    }
}
