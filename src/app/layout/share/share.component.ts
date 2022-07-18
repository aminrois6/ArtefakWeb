import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, } from '@angular/common/http';
import { DecimalPipe, DeprecatedI18NPipesModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Urlservice } from '../../shared/services/url.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertsService } from 'angular-alert-module';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { element } from 'protractor';

@Component({
    selector: 'app-share',
    templateUrl: './share.component.html',
    styleUrls: ['./share.component.scss'],
    animations: [routerTransition()]
})
export class ShareComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
