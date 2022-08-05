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
    datauser:any;
    databerkas:any[];
    databerkas2:Array<any>=[];
    iduser:any;
    viewana='analisis';
    viewda='analisis'
    dataversi:any;
    dataartefak:any;
    datajenisbacklog:any;
    datamember:any;
    namaproject:any;
    nama:any;
    idversi:any;
    major:any;
    minor:any;
    patch:any;
    faserelease:any;
    namajenis:any;
    isibacklog:any;
    idbacklog:any;
    dataedit:any;
    constructor(
        private http:HttpClient,
        private url:Urlservice,
        private modalService: NgbModal, 
        private spinner:NgxSpinnerService,
        private router : Router,
    ) {}

    ngOnInit() {
        this.dataproject=JSON.parse(localStorage.getItem('dataproject'));
        this.namaproject=this.dataproject.nama_project;
        this.datauser=JSON.parse(localStorage.getItem('isLoggedin'));
        this.iduser=this.datauser[0]['id_user'];
        this.idversi=0;
        this.panggilversi();
        this.panggiljenisbacklog();
        this.panggilbacklog();
        this.panggilmember();
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
    bukaversi(addversi) {
      this.modalService.open(addversi, {ariaLabelledBy: 'app-charts'}).result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;
        this.tambahversi();
      }, (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } 
    tambahversi(){
      if(this.major==null||this.major==undefined){
        swal.fire('Gagal','Major Tidak Boleh Kosong','error')
      }else if(this.minor==null||this.minor==undefined){
        swal.fire('Gagal','Minor Tidak Boleh Kosong','error')
      }else if(this.patch==null||this.patch==undefined){
        swal.fire('Gagal','Patch Tidak Boleh Kosong','error')
      } else if(this.faserelease==null||this.faserelease==undefined){
        swal.fire('Gagal','Release Tidak Boleh Kosong','error')
      }else{
        let formData = new FormData();
          formData.append('id_project', this.dataproject.id_project);
          formData.append('major', this.major);
          formData.append('minor', this.minor);
          formData.append('patch', this.patch);
          formData.append('fase_release', this.faserelease);
          this.http.post(this.url.apiurl+'/versi', formData).subscribe(data => {
          this.panggilversi();
            swal.fire('Berhasil!','','success')
      }, err => {
          console.log(err);
          swal.fire('Gagal!',''+err,'error'
          )
      }) 

      }
    }
    loadversi(){
      this.http.get(this.url.apiurl+'/versi/tampilversi?id_versi='+this.idversi).subscribe(data=>{
        this.dataversi=data['data'];
        this.major=this.dataversi.major;
        this.minor=this.dataversi.minor;
        this.patch=this.dataversi.patch;
        this.faserelease=this.dataversi.faserelease;
      },err=>{
        console.log(err);
      })
    }
    gantiversi(editversi, data){
      this.major=data.major;
      this.minor=data.minor;
      this.patch=data.patch;
      this.faserelease=data.fase_release;
      this.idversi=data.id_versi;
      // console.log(data);
      this.modalService.open(editversi, {ariaLabelledBy: 'app-charts'}).result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;
        let formData = new FormData();
        formData.append('id_project', this.dataproject.id_project);
        formData.append('major', this.major);
        formData.append('minor', this.minor);
        formData.append('patch', this.patch);
        formData.append('fase_release', this.faserelease);
        // formData.append('deskripsi_artefak', this.deskripsi);
        this.http.post(this.url.apiurl+'/versi/'+this.idversi, formData).subscribe(data => {
        this.panggilversi();
        swal.fire(
          'Berhasil!',
          '',
          'success'
        )
        // this.viewana="analisis"
      //   this.sdlclist();
        }, err => {
            console.log(err);
            swal.fire(
              'Gagal!',
              '',
              'error'
            )
        }) 
        
      }, (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    hapusversi(id){
      swal.fire({
        title: 'Apakan Anda Yakin?',
        text: "Anda Tidak Bisa Mengembalikan Versi Ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus Versi!',
        cancelButtonText: 'Batal!'
      }).then((result) => {
        if (result.value) {
          this.http.delete( this.url.apiurl+'/versi'+ '/' +id ).subscribe(data => {
            console.log(data);
                // alert('Sukses Hapus')
                this.panggilversi();
                swal.fire('Terhapus!','Versi Sudah Terhapus.','success')
          }, err => {
            console.log(err);
            alert(err)
            swal.fire('Gagal Menghapus!','Versi Tidak Terhapus.','error'
            )
          })
        }
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
    tambahjenisbacklog(){
      if(this.idversi==0){
        swal.fire(
          'Gagal!',
          'Pilih Versi Dulu.',
          'error'
        )
      }else{
            let formData = new FormData();
            formData.append('id_project', this.dataproject.id_project);
            formData.append('id_sdlc', this.dataproject.sdlc.id_sdlc);
            formData.append('id_versi', this.idversi);
            formData.append('nama_jenis_backlog', this.namajenis);
            this.http.post(this.url.apiurl+'/jenisbacklog', formData).subscribe(data => {
            this.panggiljenisbacklog();
              swal.fire('Berhasil!','','success')
        }, err => {
            console.log(err);
            swal.fire('Gagal!',''+err,'error'
            )
        }) 
      }
    }
    panggilbacklog(){
      this.http.get(this.url.apiurl+'/backlog/project?id_project='+this.dataproject.id_project).subscribe(data=>{
        this.dataartefak=data['data'];
        console.log(this.dataartefak);
        // this.idversi=last.call(this.dataversi);
    },err=>{
      console.log(err);
    })  
    }
    tambahbacklog(idjenisbacklog){
      console.log(idjenisbacklog);
      if(this.idversi==0){
        swal.fire(
          'Gagal!',
          'Pilih Versi Dulu.',
          'error'
        )
      }else{
        let formData = new FormData();
            formData.append('id_jenis_backlog', idjenisbacklog);
            formData.append('nama_backlog', this.nama);
            this.http.post(this.url.apiurl+'/backlog/awal', formData).subscribe(data => {
            this.panggilbacklog();
            this.viewana="analisis"
          //   this.sdlclist();
        }, err => {
            console.log(err);
        }) 
      }
    }
    cek(data){
      console.log(data);
      this.viewana=data;
      this.nama="";
    }

    panggilmember(){
      this.http.get(this.url.apiurl+'/member/cariuser?id_project='+this.dataproject.id_project+'&'+'id_user='+this.iduser).subscribe(data=>{
        this.datamember=data['data'][0].role_project.id_role_project;
        console.log(this.datamember);
    },err=>{
      console.log(err);
    })
    }

    aturversi(pengaturanversi) {
        // this.loadversi()
        this.modalService.open(pengaturanversi, {ariaLabelledBy: 'app-charts'}).result.then((result) => {
          // this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      } 
      panggilberkas(){
        let formData = new FormData();
          formData.append('id_backlog', this.dataedit.id_backlog);
          this.http.post(this.url.apiurl+'/berkasbacklog/awal', formData).subscribe(data => {
          let datanya2 =data['data'];
          this.databerkas=datanya2;
          console.log(this.databerkas);
          this.databerkas2=datanya2;
          console.log(this.databerkas2);
      }, err => {
          console.log(err);
      })  
      }

      uploadberkas(event){
        let formData = new FormData();
          formData.append('id_backlog', this.dataedit.id_backlog);
          formData.append('file_artefak', event.target.files[0]);
      this.http.post(this.url.apiurl+'/berkasbacklog/upload', formData).subscribe(data => {
          console.log(data);
          this.panggilberkas();
          // this.datanya=data['isi_berkas'];
          // console.log(this.datanya);
      }, err => {
          console.log(err);
      })   
      }
      downloadartefak(data){
        let FileSaver = require('file-saver');
        FileSaver.saveAs(this.url.apidownload+data.isi_berkas_backlog, data.nama_berkas_backlog)
      }
      hapusberkas(id){
        this.http.delete( this.url.apiurl+'/berkasbacklog'+ '/' +id ).subscribe(data => {
          console.log(data);
          this.panggilberkas();
        }, err => {
          console.log(err);
        })
      }
      open(content,artefak) {
        this.nama=artefak.nama_backlog;
        this.isibacklog=artefak.isi_backlog;
        this.idbacklog=artefak.id_backlog;
        this.dataedit=artefak;
        console.log(this.dataedit.jenis_backlog.id_jenis_backlog);
        this.panggilberkas();
        this.modalService.open(content, {ariaLabelledBy: 'app-artefak'}).result.then((result) => {
          this.ProsesUpdate();
          // console.log(this.deskripsi)
          // this.closeResult = `Closed with: ${result}`;
          
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
      ProsesUpdate(){
        if(this.isibacklog==[]||this.isibacklog==''||this.isibacklog==undefined||this.isibacklog==[ ]||this.isibacklog==' '){
          this.updatebacklogkosong();
        }else{
          this.updatebacklog();
        }
      }
      updatebacklog(){
        console.log('Deskripsi');
        let formData = new FormData();
          formData.append('id_jenis_backlog', this.dataedit.jenis_backlog.id_jenis_backlog);
          formData.append('nama_backlog', this.nama);
          formData.append('isi_backlog', this.isibacklog);
          this.http.post(this.url.apiurl+'/backlog/'+this.dataedit.id_backlog, formData).subscribe(data => {
          this.panggilbacklog();
          this.viewana="analisis"
        //   this.sdlclist();
          }, err => {
              console.log(err);
          }) 
    }
    updatebacklogkosong(){
      console.log('Deskripsi Kosong');
      let formData = new FormData();
        formData.append('id_jenis_backlog', this.dataedit.jenis_backlog.id_jenis_backlog);
        formData.append('nama_backlog', this.nama);
        // formData.append('deskripsi_artefak', this.deskripsi);
        this.http.post(this.url.apiurl+'/backlog/kosong/'+this.dataedit.id_backlog, formData).subscribe(data => {
        this.panggilbacklog();
        this.viewana="analisis"
      //   this.sdlclist();
        }, err => {
            console.log(err);
        }) 
    }
    kemember(data){
      localStorage.setItem('dataproject', JSON.stringify(data));
      this.router.navigate(['/member']);
    }
}
