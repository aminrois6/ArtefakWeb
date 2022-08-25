import { Component, OnInit,} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Urlservice } from '../../shared/services/url.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { element } from 'protractor';


@Component({
    selector: 'app-blank-page',
    templateUrl: './pencarian.component.html',
    styleUrls: ['./pencarian.component.scss'],
    animations: [routerTransition()]
})
export class PencarianComponent implements OnInit {

    datacari:any;
    datauser:any;
    iduser:any;
    datanya : Array<any>=[];
    datanyacari : Array<any>=[];
    datavsm:Array<any>=[];
    datanya2:Array<any>=[];
    datanya3:Array<any>=[];
    viewtanda:any;
    cobasort:any;
    constructor(
        private http:HttpClient,
        private url:Urlservice,
        private modalService: NgbModal, 
        private spinner:NgxSpinnerService,
        private router:Router,
    ) {}

    ngOnInit() {
        this.datauser=JSON.parse(localStorage.getItem('isLoggedin'));
        this.iduser=this.datauser[0]['id_user'];
        localStorage.removeItem('dataproject');
        this.panggilberkas(this.iduser);
        this.panggilberkasbacklog(this.iduser);
        this.panggilartefak(this.iduser);
        this.panggilbacklog(this.iduser);
        this.panggilproject(this.iduser);
        this.panggilmember(this.iduser);
        this.viewtanda='nama_project';
    }

    panggilberkas(iduser){
        this.http.get(this.url.apiurl+'/berkas/user?id_user='+iduser).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                this.datanya.push({
                    id_project:element.artefak_project.project.id_project,
                    nama_project:element.artefak_project.project.nama_project,
                    id_artefak:element.artefak_project.id_artefak,
                    nama_artefak:element.artefak_project.nama_artefak,
                    keterangan:element.artefak_project.deskripsi_artefak,
                    id_versi:element.artefak_project.versi.id_versi,
                    versi:element.artefak_project.versi.major+"."+element.artefak_project.versi.minor+"."+element.artefak_project.versi.patch,
                    id_berkas:element.id_berkas,
                    nama_berkas:element.nama_berkas,
                    isi:element.isi_berkas,
                })
            });
            console.log(this.datanyacari)
        },err=>{
          console.log(err);
        })
    }
    panggilberkasbacklog(iduser){
        this.http.get(this.url.apiurl+'/berkasbacklog/user?id_user='+iduser).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                this.datanya.push({
                    id_project:element.backlog.project.id_project,
                    nama_project:element.backlog.project.nama_project,
                    id_artefak:element.backlog.id_backlog,
                    nama_artefak:element.backlog.nama_backlog,
                    keterangan:element.backlog.isi_backlog,
                    id_versi:element.backlog.versi.id_versi,
                    versi:element.backlog.versi.major+"."+element.backlog.versi.minor+"."+element.backlog.versi.patch,
                    id_berkas:element.id_berkas_backlog,
                    nama_berkas:element.nama_berkas_backlog,
                    isi:element.isi_berkas_backlog,
                })
            });
            // console.log(this.datanya)
        },err=>{
          console.log(err);
        })
    }
    panggilartefak(iduser){
        this.http.get(this.url.apiurl+'/artefak/user?id_user='+iduser).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                if(this.datanya.findIndex(x=>x.id_artefak==element.id_artefak)!=-1) return;
                this.datanya.push({
                    id_project:element.project.id_project,
                    nama_project:element.project.nama_project,
                    id_artefak:element.id_artefak,
                    nama_artefak:element.nama_artefak,
                    keterangan:element.deskripsi_artefak,
                    id_versi:element.versi.id_versi,
                    versi:element.versi.major+"."+element.versi.minor+"."+element.versi.patch,
                    id_berkas:"",
                    nama_berkas:"",
                    isi:"",
                })
            });
            // console.log(this.datanya)
        },err=>{
          console.log(err);
        })
    }
    panggilbacklog(iduser){
        this.http.get(this.url.apiurl+'/backlog/user?id_user='+iduser).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                if(this.datanya.findIndex(x=>x.id_backlog==element.id_backlog)!=-1) return;
                this.datanya.push({
                    id_project:element.jenis_backlog.project.id_project,
                    nama_project:element.jenis_backlog.project.nama_project,
                    id_artefak:element.id_backlog,
                    nama_artefak:element.nama_backlog,
                    keterangan:element.isi_backlog,
                    id_versi:element.jenis_backlog.versi.id_versi,
                    versi:element.jenis_backlog.versi.major+"."+element.jenis_backlog.versi.minor+"."+element.jenis_backlog.versi.patch,
                    id_berkas:"",
                    nama_berkas:"",
                    isi:"",
                })
            });
            console.log(this.datanya)
        },err=>{
          console.log(err);
        })
    }
    panggilproject(iduser){
        this.http.get(this.url.apiurl+'/project/tampil?id_user='+iduser).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                if(this.datanya.findIndex(x=>x.id_project==element.id_project)!=-1) return;
                this.datanya.push({
                    id_project:element.id_project,
                    nama_project:element.nama_project,
                    id_artefak:"",
                    nama_artefak:"",
                    keterangan:"",
                    id_versi:"",
                    versi:"",
                    id_berkas:"",
                    nama_berkas:"",
                    isi:"",
                })
            });
            // console.log(this.datanya)
        },err=>{
          console.log(err);
        })
    }
    panggilmember(iduser){
        this.http.get(this.url.apiurl+'/member/tampiluser?id_user='+iduser).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                if(this.datanya.findIndex(x=>x.id_project==element.project.id_project)!=-1) return;
                this.datanya.push({
                    id_project:element.project.id_project,
                    nama_project:element.project.nama_project,
                    id_artefak:"",
                    nama_artefak:"",
                    keterangan:"",
                    id_versi:"",
                    versi:"",
                    id_berkas:"",
                    nama_berkas:"",
                    isi:"",
                })
                this.berkas(element.project.id_project);
                this.berkasbacklog(element.project.id_project);
            });
            // console.log(this.datanya)
        },err=>{
          console.log(err);
        })
    }
    berkas(idproject){
        this.http.get(this.url.apiurl+'/berkas/project?id_project='+idproject).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                if(this.datanya.findIndex(x=>x.id_project==element.artefak_project.project.id_project)!=-1) return;
                this.datanya.push({
                    id_project:element.artefak_project.project.id_project,
                    nama_project:element.artefak_project.project.nama_project,
                    id_artefak:element.artefak_project.id_artefak,
                    nama_artefak:element.artefak_project.nama_artefak,
                    keterangan:element.artefak_project.deskripsi_artefak,
                    id_versi:element.artefak_project.versi.id_versi,
                    versi:element.artefak_project.versi.major+"."+element.artefak_project.versi.minor+"."+element.artefak_project.versi.patch,
                    id_berkas:element.id_berkas,
                    nama_berkas:element.nama_berkas,
                    isi:element.isi_berkas,
                })
            });
            // console.log(this.datanya)
        },err=>{
          console.log(err);
        })
    }
    berkasbacklog(idproject){
        this.http.get(this.url.apiurl+'/berkasbacklog/project?id_project='+idproject).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                if(this.datanya.findIndex(x=>x.id_project==element.backlog.project.id_project)!=-1) return;
                this.datanya.push({
                    id_project:element.backlog.project.id_project,
                    nama_project:element.backlog.project.nama_project,
                    id_artefak:element.backlog.id_backlog,
                    nama_artefak:element.backlog.nama_backlog,
                    keterangan:element.backlog.isi_backlog,
                    id_versi:element.backlog.versi.id_versi,
                    versi:element.backlog.versi.major+"."+element.backlog.versi.minor+"."+element.backlog.versi.patch,
                    id_berkas:element.id_berkas_backlog,
                    nama_berkas:element.nama_berkas_backlog,
                    // idberkasbacklog:element.backlog.id_backlog,
                    isi:element.isi_berkas_backlog,
                })
            });
            // console.log(this.datanya)
        },err=>{
          console.log(err);
        })
    }
    caridata(){
        this.datanya2=[];
        let cari = this.datacari.toLowerCase();
        console.log(this.viewtanda);
        // this.preprocess();
        if(this.viewtanda=="nama_project"){
            this.datanya2 = this.datanya.filter(function(itm){
                return itm.nama_project.toLowerCase().includes(cari);
              });
        }else if(this.viewtanda=="keterangan"){
            this.datanya2 = this.datanya.filter(function(itm){
                return itm.keterangan.toLowerCase().includes(cari);
              });
        }else if(this.viewtanda=="nama_artefak"){
            this.datanya2 = this.datanya.filter(function(itm){
                return itm.nama_artefak.toLowerCase().includes(cari);
              });
        }else if(this.viewtanda=="nama_berkas"){
            this.datanya2 = this.datanya.filter(function(itm){
                return itm.nama_berkas.toLowerCase().includes(cari);
              });
        }
        
           if(this.datacari==[]||this.datacari==undefined||this.datacari==""){
            this.datanya2=[];
          }
            
          this.vsm(this.viewtanda);
        console.log(this.datanya3);
    }
    vsm(tanda){
        this.datanya3=[];
        this.datavsm=[];
        let headers = new HttpHeaders().set('Content-Type','application/json')
        let formData = new FormData();
          formData.append('cari', this.datacari);
          formData.append('tanda', tanda);
          formData.append('dokumen', JSON.stringify(this.datanya));
          this.http.post(this.url.apiurl+'/prosesvsm', formData).subscribe(data => {
        //   console.log(data);
          this.datavsm.push(data);
        //   console.log(this.datavsm[0])
          this.datavsm[0].forEach(element=>{
            if(this.viewtanda=="keterangan"){
                this.datanya.forEach(data1=>{
                    if(element.id_doc==data1.id_artefak&&element.id_doc!==""&&data1.keterangan!==""&&element.ranking!==0){
                        if(this.datanya3.findIndex(x=>x.id_berkas==data1.id_berkas
                            &&x.id_artefak==data1.id_artefak
                            &&x.id_project==data1.id_project)!=-1) return;
                            // this.datanya3.push({data:data1, rank:element})
                            this.datanya3.push({
                                id_project:data1.id_project,
                                nama_project:data1.nama_project,
                                id_artefak:data1.id_artefak,
                                nama_artefak:data1.nama_artefak,
                                keterangan:data1.keterangan,
                                id_versi:data1.id_versi,
                                versi:data1.versi,
                                id_berkas:data1.id_berkas,
                                nama_berkas:data1.nama_berkas,
                                id_doc:element.id_doc,
                                ranking:element.ranking,
                                isi:data1.isi,
                            })
                    }
                })
            }else if(this.viewtanda=="nama_project"){
                this.datanya.forEach(data1=>{
                    if(element.id_doc==data1.id_project&&element.id_doc!==""){
                        if(this.datanya3.findIndex(x=>x.id_berkas==data1.id_berkas
                            &&x.id_artefak==data1.id_artefak
                            &&x.id_project==data1.id_project)!=-1) return;
                            // this.datanya3.push({data:data1, rank:element})
                            this.datanya3.push({
                                id_project:data1.id_project,
                                nama_project:data1.nama_project,
                                id_artefak:data1.id_artefak,
                                nama_artefak:data1.nama_artefak,
                                keterangan:data1.keterangan,
                                id_versi:data1.id_versi,
                                versi:data1.versi,
                                id_berkas:data1.id_berkas,
                                nama_berkas:data1.nama_berkas,
                                id_doc:element.id_doc,
                                ranking:element.ranking,
                                isi:data1.isi,
                            })
                    }
                })
            }else if(this.viewtanda=="nama_artefak"){
                this.datanya.forEach(data1=>{
                    if(element.id_doc==data1.id_artefak&&element.id_doc!==""){
                        if(this.datanya3.findIndex(x=>x.id_berkas==data1.id_berkas
                            &&x.id_artefak==data1.id_artefak
                            &&x.id_project==data1.id_project)!=-1) return;
                            // this.datanya3.push({data:data1, rank:element})
                            this.datanya3.push({
                                id_project:data1.id_project,
                                nama_project:data1.nama_project,
                                id_artefak:data1.id_artefak,
                                nama_artefak:data1.nama_artefak,
                                keterangan:data1.keterangan,
                                id_versi:data1.id_versi,
                                versi:data1.versi,
                                id_berkas:data1.id_berkas,
                                nama_berkas:data1.nama_berkas,
                                id_doc:element.id_doc,
                                ranking:element.ranking,
                                isi:data1.isi,
                            })
                    }
                })
            }else if(this.viewtanda=="nama_berkas"){
                this.datanya.forEach(data1=>{
                    if(element.id_doc==data1.id_berkas&&element.id_doc!==""&&element.ranking!==0){
                        if(this.datanya3.findIndex(x=>x.id_berkas==data1.id_berkas
                            &&x.id_artefak==data1.id_artefak
                            &&x.id_project==data1.id_project)!=-1) return;
                            // this.datanya3.push({data:data1, rank:element})
                            this.datanya3.push({
                                id_project:data1.id_project,
                                nama_project:data1.nama_project,
                                id_artefak:data1.id_artefak,
                                nama_artefak:data1.nama_artefak,
                                keterangan:data1.keterangan,
                                id_versi:data1.id_versi,
                                versi:data1.versi,
                                id_berkas:data1.id_berkas,
                                nama_berkas:data1.nama_berkas,
                                id_doc:element.id_doc,
                                ranking:element.ranking,
                                isi:data1.isi,
                            })
                    }
                })
            }
          });
          this.datanya3.sort((a,b)=>b.ranking-a.ranking);
      }, err => {
          console.log(err);
          alert(err)
      })   
    }
    preprocess(){
        let formData = new FormData();
          formData.append('cari_query', this.datacari);
          this.http.post(this.url.apiurl+'/proses', formData).subscribe(data => {
          console.log(data);
      }, err => {
          console.log(err);
          alert(err)
      })   
    }

    downloadberkas(data){
            let FileSaver = require('file-saver');
            FileSaver.saveAs(this.url.apidownload+data.isi, data.nama_berkas)
    }
    keproject(dataproject){
        this.http.get(this.url.apiurl+'/project/project?id_project='+dataproject.id_project).subscribe(data=>{
            let databerkas=data['data'][0];
            console.log(databerkas);
            if(databerkas.sdlc.nama_sdlc=='Waterfall'){
                localStorage.setItem('dataproject', JSON.stringify(databerkas));
                this.router.navigate(['/artefak']);
              }else if(databerkas.sdlc.nama_sdlc=="Scrum"){
                localStorage.setItem('dataproject', JSON.stringify(databerkas));
                this.router.navigate(['/artefakscrum']);
              }
        },err=>{
          console.log(err);
        })
    }
    
}
