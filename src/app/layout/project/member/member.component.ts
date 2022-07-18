import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { HttpClient, } from '@angular/common/http';
import { Urlservice } from '../../../shared/services/url.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from 'rxjs';
import { FileSaver }   from 'file-saver';
import { send } from 'q';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss'],
    animations: [routerTransition()]
})
export class MemberComponent implements OnInit {
    dataproject:any;
    namaproject:any;
    datauser:any;
  datamember: any;
    constructor(
        private http:HttpClient,
        private url:Urlservice,
        private modalService: NgbModal, 
        private spinner:NgxSpinnerService
        ) {}
    
    ngOnInit() {
        this.dataproject=JSON.parse(localStorage.getItem('dataproject'));
        this.namaproject=this.dataproject.nama_project;
        console.log(this.namaproject);
        this.panggiluser();
        this.panggilstatusmember();

    }
    open(carimem) {
        this.modalService.open(carimem, {ariaLabelledBy: 'app-charts'}).result.then((result) => {
          // this.closeResult = `Closed with: ${result}`;
          // this.tambah();
          
        }, (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      } 
      private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
          } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return  `with: ${reason}`;
          }
        }
    panggiluser(){
        this.http.get(this.url.apiurl+'/users').subscribe(data => {
            this.datauser=data['data'];
            console.log(this.datauser);
        }, err => {
          console.log(err);
      })
    }
    panggilstatusmember(){
      this.http.get(this.url.apiurl+'/member').subscribe(data=>{
          this.datamember=data['data'];
          console.log(this.datamember);
      },err=>{
        console.log(err);
      })
    }
}
