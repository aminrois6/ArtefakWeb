import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { HttpClient, } from '@angular/common/http';
import { Urlservice } from '../../../shared/services/url.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from 'rxjs';
import { FileSaver }   from 'file-saver';
import { send } from 'q';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { last } from 'rxjs/operators';

@Component({
    selector: 'app-artefak',
    templateUrl: './artefakscrum.component.html',
    styleUrls: ['./artefakscrum.component.scss'],
    animations: [routerTransition()]
})
export class ArtefakscrumComponent implements OnInit {
    dataproject:any;
    viewana='analisis';
    viewda='analisis'
    dataversi:any;
    dataartefak:any;
    datajenisbacklog:any;
    datamember:any;
    idversi:any;
    constructor(
        private http:HttpClient,
        private url:Urlservice,
        private modalService: NgbModal, 
        private spinner:NgxSpinnerService,
        private router : Router,
    ) {}

    ngOnInit() {
        this.dataproject=JSON.parse(localStorage.getItem('dataproject'));
        this.idversi=0;
        this.panggilversi();
        this.panggiljenisbacklog();
    }
    panggilversi(){
        this.http.get(this.url.apiurl+'/versi/tampil?id_project='+this.dataproject.id_project).subscribe(data=>{
            this.dataversi=data['data'];
            console.log(this.dataversi);
            // this.idversi=last.call(this.dataversi);
        },err=>{
          console.log(err);
        })
    }
    panggiljenisbacklog(){
        let formData = new FormData();
          formData.append('id_project', this.dataproject.id_project);
          formData.append('id_versi', this.idversi);
          this.http.post(this.url.apiurl+'/jenisbacklog/data', formData).subscribe(data => {
          let datanya2 =data['data'];
          this.datajenisbacklog=datanya2;
          console.log(this.datajenisbacklog);
          this.panggilbacklog();
      }, err => {
          console.log(err);
      })   
    }
    panggilbacklog(){

    }

    panggilmember(){

    }

    aturversi(pengaturanversi) {
        // this.loadversi()
        this.modalService.open(pengaturanversi, {ariaLabelledBy: 'app-charts'}).result.then((result) => {
          // this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      } 

}
