import { Component, OnInit, Input } from '@angular/core';
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
    selector: 'app-charts',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
    animations: [routerTransition()],
    providers: [DecimalPipe]
})

 
export class ProjectComponent implements OnInit {
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
    constructor(private modalService: NgbModal, 
      private http: HttpClient, 
      private url: Urlservice,
      private spinner: NgxSpinnerService,
      private alerts: AlertsService,
      private router : Router,
      ) {
    }
   

    ngOnInit() {
        this.spinner.hide();
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
          this.http.get(this.url.apiurl+'/project/tampil?id_user='+ this.iduser).subscribe(data => {
          let datanya2 =data['data'];
          this.datanya=datanya2;
          // console.log(this.datanya)
          this.link=data['meta'].pagination;
          const total=data['meta'].pagination.total_pages;
          for (let index = 0; index < total; index++) {
            this.total_pages.push({no:total+1}); 
          }
          console.log(this.datanya);
          this.sdlclist();
      }, err => {
          console.log(err);
      })    
    }
    next(){
      // console.log(this.link['next'])
      this.datanya=[];
      this.http.get<any>(this.link['links']['next']+'&id_user='+this.iduser).subscribe(data => {
        let datanya2 =data['data'];
          this.datanya=datanya2;
          this.link=data['meta'].pagination;
          // console.log(this.datanya);
          this.sdlclist();
      }, err => {
          console.log(err);
      })    
    }
    prev(){
      // console.log(this.link['previous'])
      this.datanya=[];
      this.http.get<any>(this.link['links']['previous']+'&id_user='+this.iduser).subscribe(data => {
        let datanya2 =data['data'];
          this.datanya=datanya2;
          this.link=data['meta'].pagination;
          // console.log(this.datanya);
          this.sdlclist();
      }, err => {
          console.log(err);
      })   
    }
    hitung(i){
      this.datanya=[];
      this.http.get<any>(this.url.apiurl+'/project/tampil?id_user='+ this.iduser +'&page='+i).subscribe(data => {
        let datanya2 =data['data'];
          this.datanya=datanya2;
          this.link=data['meta'].pagination;
          console.log(this.datanya);
          this.sdlclist();
      }, err => {
          console.log(err);
      })   
    }
    sdlclist(){
        let url2= this.url.apiurl+'/sdlc';
          this.http.get(url2).subscribe(rest => {
          // console.log(data.data);
          let datanya3 =rest['data'];
          this.datasdlc=datanya3;
          // console.log(this.datasdlc);    
        }); 
      }
    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'app-charts'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          this.tambah();
          
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
    tambah(){
      if(this.nama==""||this.nama==undefined){
        alert('Nama Tidak Boleh Kosong')
      }else if (this.idsdlc==0){
        alert('Metode Project Harus di Pilih');
      }else{
        this.datanya=[];
        let formData = new FormData();
          formData.append('nama_project', this.nama);
          formData.append('id_user', this.iduser);
          formData.append('id_sdlc', this.idsdlc);
          this.http.post(this.url.apiurl+'/project', formData).subscribe(data => {
          console.log(data);
          this.tambahmember(data);
          // this.tambahversi(data);
          this.project();
      }, err => {
          console.log(err);
          alert(err)
      })   
      } 
    }
    tambahmember(data){
      let formData = new FormData();
                  formData.append('id_project', data.id_project);
                  formData.append('id_user', this.iduser);
                  formData.append('id_role_project', "2");
                  this.http.post(this.url.apiurl+'/member', formData).subscribe(data => {
                  console.log(data);
                  // this.panggilstatusmember();
            }, err => {
              console.log(err);
              alert(err)
            })
    }
    tambahversi(data){
      let formData = new FormData();
          formData.append('id_project', this.data.id_project);
          formData.append('major', "1");
          formData.append('minor', "0");
          formData.append('patch', "0");
          this.http.post(this.url.apiurl+'/versi/awal', formData).subscribe(data => {

          // this.loadArtefak();
          // this.viewana="analisis"
        //   this.sdlclist();
      }, err => {
          console.log(err);
      }) 
    }
    hapus(id){
      swal.fire({
        title: 'Apakan Anda Yakin?',
        text: "Anda Tidak Bisa Mengembalikan Data Ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus Data!',
        cancelButtonText: 'Batal!'
      }).then((result) => {
        if (result.value) {
          this.http.delete( this.url.apiurl+'/project'+ '/' +id ).subscribe(data => {
            console.log(data);
                // alert('Sukses Hapus')
                this.project();
                swal.fire(
                  'Terhapus!',
                  'File Anda Sudah Terhapus.',
                  'success'
                )
          }, err => {
            console.log(err);
            alert(err)
            swal.fire(
              'Gagal Menghapus!',
              'File Anda Tidak Terhapus.',
              'error'
            )
          })
        }
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
    kemember(data){
      localStorage.setItem('dataproject', JSON.stringify(data));
      this.router.navigate(['/member']);
    }
}



