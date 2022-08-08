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
    templateUrl: './artefak.component.html',
    styleUrls: ['./artefak.component.scss'],
    animations: [routerTransition()]
})
export class ArtefakComponent implements OnInit {
    viewana='analisis';
    nama:any;
    dataedit:any;
    namaproject: string;
    dataproject:any;
    databerkas:any[];
    databerkas2: Array<any>=[];
    datanya:any;
    datamember:any;
    datanyaArtefak:any;
    idartefak:any;
    closeResult: string;
    deskripsi: any;
    datauser:any;
    iduser:any;
    dataversi:any;
    dataversi2:any;
    idversi:any;
    image_pro:any;
    major:any;
    minor:any;
    patch:any;
    faserelease:any;
    image_ext:Array<any>=['jpeg','jpg','png','gif'];
    audio_ext:Array<any>=['mp3','oga','ogg','wav', 'm3u', 'mp4a', 'mpga', 'weba', 'm4a'];
    doc_ext:Array<any>=['doc','docx','pptx','sldx','ppsx','potx','xlsx','xltx','dotx','rtf','xls','ppt','pdf', 'txt'];
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
        console.log(this.namaproject);
        this.idversi=0;
        this.loadJenis();
        this.panggilmemberuser();
        this.panggilversi();
    }
    open(content,artefak) {
      this.nama=artefak.nama_artefak;
      this.deskripsi=artefak.deskripsi_artefak;
      this.idartefak=artefak.id_artefak;
      this.dataedit=artefak;
      console.log(this.dataedit);
      this.loadBerkas();
      this.modalService.open(content, {ariaLabelledBy: 'app-artefak'}).result.then((result) => {
        this.ProsesUpdate();
        console.log(this.deskripsi)
        this.closeResult = `Closed with: ${result}`;
        
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
    loadJenis(){
        let formData = new FormData();
          formData.append('id_sdlc', this.dataproject.sdlc.id_sdlc);
          this.http.post(this.url.apiurl+'/jenis/data', formData).subscribe(data => {
          let datanya2 =data['data'];
          this.datanya=datanya2;
          console.log(this.datanya);
          this.loadArtefak();
      }, err => {
          console.log(err);
      })   
    } 
    // loadArtefak(){
    //   console.log(this.dataproject.id_project);
    //    let formData = new FormData();
    //       formData.append('id_project', this.dataproject.id_project);
    //       this.http.post(this.url.apiurl+'/artefak/project', formData).subscribe(data => {
    //       let datanya2 =data['data'];
    //       this.datanyaArtefak=datanya2;
    //       console.log(datanya2);
    //     //   this.sdlclist();
    //   }, err => {
    //       console.log(err);
    //   })  
    // }
    loadArtefak(){
      // console.log(this.dataproject.id_project);
      if(this.idversi!==0){
        let formData = new FormData();
          formData.append('id_versi', this.idversi);
          this.http.post(this.url.apiurl+'/artefak/versi', formData).subscribe(data => {
          let datanya2 =data['data'];
          this.datanyaArtefak=datanya2;
          console.log(datanya2);
        //   this.sdlclist();
        }, err => {
            console.log(err);
        })  
      }
       
    }
    cek(data){
      // console.log(data);
      this.viewana=data;
      this.nama="";
    }
    TambahArtefak(idjenis){
      if(this.idversi==0){
        swal.fire(
          'Gagal!',
          'Pilih Versi Dulu.',
          'error'
        )
      }if(!this.nama){
        // alert('Error')
        swal.fire(
          'Gagal!',
          'Nama Tidak Boleh Kosong.',
          'error'
        )
      }else{
        let formData = new FormData();
            formData.append('id_project', this.dataproject.id_project);
            formData.append('id_versi', this.idversi);
            formData.append('nama_artefak', this.nama);
            formData.append('id_jenis', idjenis);
            this.http.post(this.url.apiurl+'/artefak/awal', formData).subscribe(data => {
            this.loadArtefak();
            this.viewana="analisis"
          //   this.sdlclist();
        }, err => {
            console.log(err);
        }) 
      }
    }
    ProsesUpdate(){
      if(this.deskripsi==[]||this.deskripsi==''||this.deskripsi==undefined||this.deskripsi==[ ]||this.deskripsi==' '){
        this.UpdateArtefakKosong();
      }else{
        this.UpdateArtefak();
      }
    }
    UpdateArtefak(){
        console.log('Deskripsi');
        let formData = new FormData();
          formData.append('id_project', this.dataproject.id_project);
          formData.append('id_versi', this.idversi);
          formData.append('nama_artefak', this.nama);
          formData.append('id_jenis', this.dataedit.jenis.id_jenis);
          formData.append('deskripsi_artefak', this.deskripsi);
          this.http.post(this.url.apiurl+'/artefak/'+this.dataedit.id_artefak, formData).subscribe(data => {
          this.loadArtefak();
          this.viewana="analisis"
        //   this.sdlclist();
          }, err => {
              console.log(err);
          }) 
    }
    UpdateArtefakKosong(){
      console.log('Deskripsi Kosong');
      let formData = new FormData();
        formData.append('id_project', this.dataproject.id_project);
        formData.append('id_versi', this.idversi);
        formData.append('nama_artefak', this.nama);
        formData.append('id_jenis', this.dataedit.jenis.id_jenis);
        // formData.append('deskripsi_artefak', this.deskripsi);
        this.http.post(this.url.apiurl+'/artefak/kosong/'+this.dataedit.id_artefak, formData).subscribe(data => {
        this.loadArtefak();
        this.viewana="analisis"
      //   this.sdlclist();
        }, err => {
            console.log(err);
        }) 
    }

    // prosesupload(event){
    //   this.image_pro = event.target.files[0].name;
    //   console.log(this.image_pro);
    // }
    
    uploadartefak(event){
      this.spinner.show();
      let formData = new FormData();
          formData.append('id_artefak', this.dataedit.id_artefak);
          formData.append('file_artefak', event.target.files[0]);
      this.http.post(this.url.apiurl+'/berkas/upload', formData).subscribe(data => {
          console.log(data);
          this.loadBerkas();
          // this.datanya=data['isi_berkas'];
          // console.log(this.datanya);
      }, err => {
          console.log(err);
      })    
    }
    downloadartefak(data){
      let FileSaver = require('file-saver');
      FileSaver.saveAs(this.url.apidownload+data.isi_berkas, data.nama_berkas)
    }
    hapusartefak(id){
      swal.fire({
        title: 'Apakan Anda Yakin?',
        text: "Anda Tidak Bisa Mengembalikan Artefak Ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal!'
      }).then((result) => {
        if (result.value) {
          this.http.delete( this.url.apiurl+'/artefak'+ '/' +id ).subscribe(data => {
            console.log(data);
                // alert('Sukses Hapus')
                this.loadArtefak();
                swal.fire(
                  'Terhapus!',
                  'Artefak Anda Sudah Terhapus.',
                  'success'
                )
          }, err => {
            console.log(err);
            alert(err)
            swal.fire(
              'Gagal Menghapus!',
              'Artefak Anda Tidak Terhapus.',
              'error'
            )
          })
        }
      })
    }
    hapusberkas(id){
      this.http.delete( this.url.apiurl+'/berkas'+ '/' +id ).subscribe(data => {
        console.log(data);
        this.loadBerkas();
      }, err => {
        console.log(err);
      })
    }

    loadBerkas(){
      this.spinner.hide();
      let formData = new FormData();
          formData.append('id_artefak', this.dataedit.id_artefak);
          this.http.post(this.url.apiurl+'/berkas/awal', formData).subscribe(data => {
          let datanya2 =data['data'];
          this.databerkas=datanya2;
          console.log(this.databerkas);
          this.databerkas2=datanya2;
          // this.databerkas=this.databerkas2;
        //   this.databerkas.forEach(element=>{
        //   if(element.nama_berkas.split('.').pop()==this.image_ext){
        //     this.databerkas2.push({artefak_project:element.artefak_project, id_berkas:element.id_berkas, isi_berkas:element.isi_berkas, 
        //       nama_berkas:element.nama_berkas, foto_berkas:element.isi_berkas })
        //   }else if(element.nama_berkas.split('.').pop()==this.doc_ext){
        //     this.databerkas2.push({artefak_project:element.artefak_project, id_berkas:element.id_berkas, isi_berkas:element.isi_berkas, 
        //       nama_berkas:element.nama_berkas, foto_berkas:'/berkas/docx1229.PNG'})
        //   }else if(element.nama_berkas.split('.').pop()==this.doc_ext){
        //     this.databerkas2.push({artefak_project:element.artefak_project, id_berkas:element.id_berkas, isi_berkas:element.isi_berkas, 
        //       nama_berkas:element.nama_berkas, foto_berkas:'berkas/pdf1229.PNG' })
        //   }else{
        //     this.databerkas2.push({artefak_project:element.artefak_project, id_berkas:element.id_berkas, isi_berkas:element.isi_berkas, 
        //       nama_berkas:element.nama_berkas, foto_berkas:element.isi_berkas })
        //   }
        // })
        
          console.log(this.databerkas2);
      }, err => {
          console.log(err);
      })  
    }
    panggilmemberuser(){
      this.http.get(this.url.apiurl+'/member/cariuser?id_project='+this.dataproject.id_project+'&'+'id_user='+this.iduser).subscribe(data=>{
        this.datamember=data['data'][0].role_project.id_role_project;
        console.log(this.datamember);
    },err=>{
      console.log(err);
    })
    }
    kemember(data){
      localStorage.setItem('dataproject', JSON.stringify(data));
      this.router.navigate(['/member']);
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
    tambahversi(){
      if(this.major==null||this.major==undefined){
        swal.fire('Gagal','Major Tidak Boleh Kosong','error')
      }else if(this.minor==null||this.minor==undefined){
        swal.fire('Gagal','Minor Tidak Boleh Kosong','error')
      }else if(this.patch==null||this.patch==undefined){
        swal.fire('Gagal','Patch Tidak Boleh Kosong','error')
      } else if(this.faserelease==null||this.faserelease==undefined||this.faserelease==""){
        // swal.fire('Gagal','Release Tidak Boleh Kosong','error')
        let formData = new FormData();
        formData.append('id_project', this.dataproject.id_project);
        formData.append('major', this.major);
        formData.append('minor', this.minor);
        formData.append('patch', this.patch);
        // formData.append('fase_release', this.faserelease);
        this.http.post(this.url.apiurl+'/versi/kosong', formData).subscribe(data => {
        this.panggilversi();
          swal.fire('Berhasil!','','success')
    }, err => {
        console.log(err);
        swal.fire(
          'Gagal!',
          ''+err,
          'error'
        )
    }) 
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
          swal.fire(
            'Gagal!',
            ''+err,
            'error'
          )
      }) 

      }
      
    }
    bukaversi(addversi) {
      this.modalService.open(addversi, {ariaLabelledBy: 'app-charts'}).result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;
        this.tambahversi();
      }, (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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
    aturversi(pengaturanversi) {
      // this.loadversi()
      this.modalService.open(pengaturanversi, {ariaLabelledBy: 'app-charts'}).result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } 
    ubahversi(editversi,data) {
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
                swal.fire(
                  'Terhapus!',
                  'Versi Sudah Terhapus.',
                  'success'
                )
          }, err => {
            console.log(err);
            alert(err)
            swal.fire(
              'Gagal Menghapus!',
              'Versi Tidak Terhapus.',
              'error'
            )
          })
        }
      })
    }
}
