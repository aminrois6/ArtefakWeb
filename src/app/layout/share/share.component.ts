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
    closeResult: string;
    email:any;
    nama:any;
    password:any;
    datanya:Array<any>=[];
    datasdlc:any;
    datauser:any;
    iduser:any;
    idsdlc:any;
    datanya2:Array<any>=[];
    datanya1:any;
    link:Array<any>=[];
    total_pages:Array<any>=[];
    balik:any;
    constructor(
        private modalService: NgbModal, 
      private http: HttpClient, 
      private url: Urlservice,
      private spinner: NgxSpinnerService,
      private alerts: AlertsService,
      private router : Router,
    ) {}

    ngOnInit() {
        this.datauser=JSON.parse(localStorage.getItem('isLoggedin'));
        this.iduser=this.datauser[0]['id_user'];
        this.project();    
        // console.log(this.iduser);
        this.idsdlc=0;
        localStorage.removeItem('dataproject');
    }

    project(){
        this.datanya=[];
          this.link=[];
          this.total_pages=[];
      let formData = new FormData();
          formData.append('id_user', this.iduser);
          this.http.get(this.url.apiurl+'/member/tampiluser?id_user='+ this.iduser).subscribe(data => {
            // this.http.get(this.url.apiurl+'/member').subscribe(data => {
          let datanya2 =data['data'];
          // this.datanya=datanya2;
          datanya2.forEach(element => {
            // console.log(element.role_project.nama_role_project)
            if(element.role_project.nama_role_project !=='Pemilik Project'){
              this.datanya.push(element);
            }
          });
          this.link=data['meta'].pagination;
          const total=data['meta'].pagination.total_pages;
          for (let index = 0; index < total; index++) {
            this.total_pages.push({no:total+1}); 
          }
          console.log(this.datanya);
        //   this.sdlclist();
      }, err => {
          console.log(err);
      })    
    }
    next(){
        // console.log(this.link['next'])
        this.datanya=[];
        this.http.get<any>(this.link['links']['next']+'&id_user='+this.iduser).subscribe(data => {
          let datanya2 =data['data'];
          datanya2.forEach(element => {
            // console.log(element.role_project.nama_role_project)
            if(element.role_project.nama_role_project !=='Pemilik Project'){
              this.datanya.push(element);
            }
          });
            // this.datanya=datanya2;
            this.link=data['meta'].pagination;
            // console.log(this.datanya);
            // this.sdlclist();
        }, err => {
            console.log(err);
        })    
      }
      prev(){
        // console.log(this.link['previous'])
        this.datanya=[];
        this.http.get<any>(this.link['links']['previous']+'&id_user='+this.iduser).subscribe(data => {
          let datanya2 =data['data'];
          datanya2.forEach(element => {
            // console.log(element.role_project.nama_role_project)
            if(element.role_project.nama_role_project !=='Pemilik Project'){
              this.datanya.push(element);
            }
          });
            // this.datanya=datanya2;
            this.link=data['meta'].pagination;
            // console.log(this.datanya);
            // this.sdlclist();
        }, err => {
            console.log(err);
        })   
      }
      hitung(i){
        this.datanya=[];
        this.http.get<any>(this.url.apiurl+'/member/tampiluser?id_user='+ this.iduser +'&page='+i).subscribe(data => {
          let datanya2 =data['data'];
          datanya2.forEach(element => {
            // console.log(element.role_project.nama_role_project)
            if(element.role_project.id_role_project !==2){
              this.datanya.push(element);
            }
          });
            // this.datanya=datanya2;
            this.link=data['meta'].pagination;
            console.log(this.datanya);
            // this.sdlclist();
        }, err => {
            console.log(err);
        })   
      }
      keproject(data){
        if(data.sdlc.nama_sdlc=='Waterfall'){
          localStorage.setItem('dataproject', JSON.stringify(data));
          this.router.navigate(['/artefak']);
        }else if(data.sdlc.nama_sdlc=="Scrum"){
          localStorage.setItem('dataproject', JSON.stringify(data));
          this.router.navigate(['/artefakscrum']);
        }
      }
      hapusmember(id){
        swal.fire({
          title: 'Apakan Anda Yakin?',
          text: "Anda Tidak Bisa Mengembalikan Member Ini!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, Hapus Member!',
          cancelButtonText: 'Batal!'
        }).then((result) => {
          if (result.value) {
            this.http.delete( this.url.apiurl+'/member'+ '/' +id ).subscribe(data => {
              console.log(data);
                  // alert('Sukses Hapus')
                  this.project();
                  swal.fire(
                    'Berhasil!',
                    'Anda Telah Keluar dari Member Project',
                    'success'
                  )
            }, err => {
              console.log(err);
              alert(err)
              swal.fire(
                'Gagal!',
                'Anda Gagal Keluar dari Member Project.',
                'error'
              )
            })
          }
        })
      }
}
