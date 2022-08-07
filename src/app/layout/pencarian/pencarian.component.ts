import { Component, OnInit,} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { routerTransition } from '../../router.animations';
import { HttpClient,} from '@angular/common/http';
import { Urlservice } from '../../shared/services/url.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";


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
    datanya2:any;
    constructor(
        private http:HttpClient,
        private url:Urlservice,
        private modalService: NgbModal, 
        private spinner:NgxSpinnerService,
    ) {}

    ngOnInit() {
        this.datauser=JSON.parse(localStorage.getItem('isLoggedin'));
        this.iduser=this.datauser[0]['id_user'];
        this.panggilberkas();
        this.panggilberkasbacklog();
        this.panggilartefak();
        this.panggilbacklog();
        this.panggilproject();
        // this.panggilmember();
    }

    panggilberkas(){
        this.http.get(this.url.apiurl+'/berkas/user?id_user='+this.iduser).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                this.datanya.push({
                    id_project:element.artefak_project.project.id_project,
                    nama_project:element.artefak_project.project.nama_project,
                    id_artefak:element.artefak_project.id_artefak,
                    nama_artefak:element.artefak_project.nama_artefak,
                    id_versi:element.artefak_project.versi.id_versi,
                    versi:element.artefak_project.versi.major+"."+element.artefak_project.versi.minor+"."+element.artefak_project.versi.patch,
                    id_berkas:element.id_berkas,
                    nama_berkas:element.nama_berkas,
                })
            });
            // console.log(this.datanya)
        },err=>{
          console.log(err);
        })
    }
    panggilberkasbacklog(){
        this.http.get(this.url.apiurl+'/berkasbacklog/user?id_user='+this.iduser).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                this.datanya.push({
                    id_project:element.backlog.project.id_project,
                    nama_project:element.backlog.project.nama_project,
                    id_artefak:element.backlog.id_backlog,
                    nama_artefak:element.backlog.nama_backlog,
                    id_versi:element.backlog.versi.id_versi,
                    versi:element.backlog.versi.major+"."+element.backlog.versi.minor+"."+element.backlog.versi.patch,
                    id_berkas:element.id_berkas_backlog,
                    nama_berkas:element.nama_berkas_backlog,
                    // idberkasbacklog:element.backlog.id_backlog,
                })
            });
            // console.log(this.datanya)
        },err=>{
          console.log(err);
        })
    }
    panggilartefak(){
        this.http.get(this.url.apiurl+'/artefak/user?id_user='+this.iduser).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                if(this.datanya.findIndex(x=>x.id_artefak==element.id_artefak)!=-1) return;
                this.datanya.push({
                    id_project:element.project.id_project,
                    nama_project:element.project.nama_project,
                    id_artefak:element.id_artefak,
                    nama_artefak:element.nama_artefak,
                    id_versi:element.versi.id_versi,
                    versi:element.versi.major+"."+element.versi.minor+"."+element.versi.patch,
                    // id_berkas:element.id_berkas,
                    // nama_berkas:element.nama_berkas,
                })
            });
            // console.log(this.datanya)
        },err=>{
          console.log(err);
        })
    }
    panggilbacklog(){
        this.http.get(this.url.apiurl+'/backlog/user?id_user='+this.iduser).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                if(this.datanya.findIndex(x=>x.id_backlog==element.id_backlog)!=-1) return;
                this.datanya.push({
                    id_project:element.jenis_backlog.project.id_project,
                    nama_project:element.jenis_backlog.project.nama_project,
                    id_artefak:element.id_backlog,
                    nama_artefak:element.nama_backlog,
                    id_versi:element.jenis_backlog.versi.id_versi,
                    versi:element.jenis_backlog.versi.major+"."+element.jenis_backlog.versi.minor+"."+element.jenis_backlog.versi.patch,
                    // id_berkas:element.id_berkas_backlog,
                    // nama_berkas:element.nama_berkas_backlog,
                })
            });
            console.log(this.datanya)
        },err=>{
          console.log(err);
        })
    }
    panggilproject(){
        this.http.get(this.url.apiurl+'/project/tampil?id_user='+this.iduser).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                if(this.datanya.findIndex(x=>x.id_project==element.id_project)!=-1) return;
                this.datanya.push({
                    id_project:element.id_project,
                    nama_project:element.nama_project,
                    // id_artefak:element.id_artefak,
                    // nama_artefak:element.nama_artefak,
                    // id_versi:element.versi.id_versi,
                    // versi:element.versi.major+"."+element.versi.minor+"."+element.versi.patch,
                    // id_berkas:element.id_berkas,
                    // nama_berkas:element.nama_berkas,
                })
            });
            console.log(this.datanya)
        },err=>{
          console.log(err);
        })
    }
    panggilmember(){
        this.http.get(this.url.apiurl+'/member/user?id_user='+this.iduser).subscribe(data=>{
            let databerkas=data['data'];
            // console.log(databerkas[0].artefak_project.project.nama_project);
            databerkas.forEach(element => {
                this.datanya.push({
                    id_project:element.artefak_project.project.id_project,
                    nama_project:element.artefak_project.project.nama_project,
                    id_artefak:element.artefak_project.id_artefak,
                    nama_artefak:element.artefak_project.nama_artefak,
                    id_versi:element.artefak_project.versi.id_versi,
                    versi:element.artefak_project.versi.major+"."+element.artefak_project.versi.minor+"."+element.artefak_project.versi.patch,
                    id_berkas:element.id_berkas,
                    nama_berkas:element.nama_berkas,
                })
            });
            // console.log(this.datanya)
        },err=>{
          console.log(err);
        })
    }
    caridata(){
        this.datanya2=[];
        let cari = this.datacari;
        this.datanya2 = this.datanya.filter(function(itm){
            // console.log(itm.nama_user);
            // return itm.nama_project.toLowerCase().indexOf(cari.toLowerCase()) !== -1;
            return itm.nama_project.toLowerCase().includes(cari.toLowerCase())
            || itm.nama_artefak.toLowerCase().includes(cari.toLowerCase());
          });
          if(this.datacari==[]||this.datacari==undefined||this.datacari==""){
            this.datanya2=[];
          }
          console.log(this.datanya2)
    }
    
}
