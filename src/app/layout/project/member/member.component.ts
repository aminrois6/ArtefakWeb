import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { HttpClient, } from '@angular/common/http';
import { Urlservice } from '../../../shared/services/url.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from 'rxjs';
import { FileSaver }   from 'file-saver';
import { send } from 'q';
import swal from 'sweetalert2';

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
  datamember2:any;
  datacari:any;
  datausercari:Array<any>=[];
  datanya:any;
  datarole:any;
  idrole:any;
  idversi:any;
  closeResult: string;
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
        this.panggilrole();
        this.idrole=0;

    }
    open(carimem) {
        this.modalService.open(carimem, {ariaLabelledBy: 'app-charts'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          // this.tambah();
          
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
        buka(carirole, data) {
          this.idrole=0;
          this.datamember2=data;
          this.modalService.open(carirole, {ariaLabelledBy: 'app-charts'}).result.then((result) => {
            // this.closeResult = `Closed with: ${result}`;
            this.tambahmember();
            // this.datanya.splice(i,-1);
            // this.carimember();
            // console.log(this.datamember2.nama_user);
            
          }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        } 
        gantirole(editrole, member) {
          this.datamember2=member;
          this.idrole=member.role_project.id_role_project;
          this.modalService.open(editrole, {ariaLabelledBy: 'app-charts'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            // this.tambah();
            console.log(this.datamember2);
            
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
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
      this.http.get(this.url.apiurl+'/member/tampil?id_project='+this.dataproject.id_project).subscribe(data=>{
          this.datamember=data['data'];
          console.log(this.datamember);
      },err=>{
        console.log(err);
      })
    }
    panggilrole(){
      this.http.get(this.url.apiurl+'/role').subscribe(data=>{
        this.datarole=data['data'];
        console.log(this.datarole);
    },err=>{
      console.log(err);
    })
    }
    carimember(){
      this.datausercari=[];
      this.datanya=[];
      let cari=this.datacari;
      console.log(this.datacari)
      this.datauser.forEach(element => {
        if(this.datamember.findIndex(x=>x.user.nama_user==element.nama_user) != -1) return;
        this.datausercari.push(element)
        // console.log(element)
      });
      this.datanya = this.datausercari.filter(function(itm){
        // console.log(itm.nama_user);
        return itm.nama_user.toLowerCase().indexOf(cari.toLowerCase()) !== -1;
      });
      this.panggilstatusmember();
      this.panggiluser();
      if(this.datacari==[]||this.datacari==undefined||this.datacari==""){
        this.datanya=[];
      }
    }
    tambahmember(){
      if (this.idrole==0){
        // alert('Metode Project Harus di Pilih');
        swal.fire(
          'Gagal!',
          'Status Member Harus di Pilih',
          'error'
        )
      }else{
        swal.fire({
          title: 'Apakan Anda Yakin?',
          text: "Ingin Menambah "+this.datamember2.nama_user+" Sebagai Member Baru Project "+this.dataproject.nama_project+" ini !!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, Tambah Member!',
          cancelButtonText: 'Batal!'
        }).then((result) => {
          if (result.value) {
                  let formData = new FormData();
                  formData.append('id_project', this.dataproject.id_project);
                  formData.append('id_user', this.datamember2.id_user);
                  formData.append('id_role_project', this.idrole);
                  this.http.post(this.url.apiurl+'/member', formData).subscribe(data => {
                  console.log(data);
                  this.panggilstatusmember();
                  swal.fire(
                    'Berhasi!',
                    'Berhasil Tambah Member Baru.',
                    'success'
                  )
            }, err => {
              console.log(err);
              alert(err)
              swal.fire(
                'Gagal Tambah!',
                'Gagal Tambah Member Baru.',
                'error'
              )
            })
          }
        })   
      } 
    }

    editmember(id){
      if (this.idrole==0){
        // alert('Metode Project Harus di Pilih');
        swal.fire(
          'Gagal!',
          'Status Member Harus di Pilih',
          'error'
        )
      }else{
        swal.fire({
          title: 'Apakan Anda Yakin?',
          text: "Ingin Mengganti Status Member "+this.datamember2.user.nama_user+" !!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, Ganti Status!',
          cancelButtonText: 'Batal!'
        }).then((result) => {
          if (result.value) {
                  let formData = new FormData();
                  formData.append('id_project', this.dataproject.id_project);
                  formData.append('id_user', this.datamember2.user.id_user);
                  formData.append('id_role_project', this.idrole);
                  this.http.post(this.url.apiurl+'/member/'+id, formData).subscribe(data => {
                  console.log(data);
                  this.panggilstatusmember();
                  swal.fire(
                    'Berhasi!',
                    'Berhasil Tambah Member Baru.',
                    'success'
                  )
            }, err => {
              console.log(err);
              alert(err)
              swal.fire(
                'Gagal Tambah!',
                'Gagal Tambah Member Baru.',
                'error'
              )
            })
          }
        })   
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
                this.panggilstatusmember();
                swal.fire(
                  'Terhapus!',
                  'Member Anda Sudah Terhapus.',
                  'success'
                )
          }, err => {
            console.log(err);
            alert(err)
            swal.fire(
              'Gagal Menghapus!',
              'Member Anda Tidak Terhapus.',
              'error'
            )
          })
        }
      })
    }
}
