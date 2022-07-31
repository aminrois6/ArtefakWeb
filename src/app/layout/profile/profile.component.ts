import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Urlservice } from '../../shared/services/url.service';

@Component({
    selector: 'app-grid',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {
    datauser: any;
    iduser: any;
    datanya2: any;
    nama: any;
    email: any;
    password: any;
    imageUrl: any;
    urlgambar: string;
    constructor(
        private http: HttpClient, 
		private router:Router,
		private spinner: NgxSpinnerService,
		private url: Urlservice,
    ) {}

    ngOnInit() {
        this.datauser=JSON.parse(localStorage.getItem('isLoggedin'));
        this.loadprofile();
        // this.proses();
    }
    loadprofile(){
        this.iduser=this.datauser[0]['id_user'];
        this.nama=this.datauser[0]['nama_user'];
        this.email=this.datauser[0]['email_user'];
        this.password=this.datauser[0]['password_user'];
        this.imageUrl=this.datauser[0]['image_user']
        this.urlgambar=this.url.apidownload;
    }
    proses(){
        let formData = new FormData();
          formData.append('id_user', this.iduser);
          this.http.get(this.url.apiurl+'/project/tampil?id_user='+ this.iduser).subscribe(data => {
          this.datanya2 =data['data'];
          console.log(this.datanya2)
      }, err => {
          console.log(err); 
      })    
    }
    ganti(){
        // let h:HttpHeaders=new HttpHeaders();
        let formData = new FormData();
          formData.append('email_user', this.email);
          formData.append('password_user', this.password);
          formData.append('nama_user', this.nama);
          this.http.post(this.url.apiurl+'/users/update/'+this.iduser, formData).subscribe(data => {
          let datanya2 =data['data'];
          console.log(datanya2)
          alert("Ganti Profil Sukses")
        //   localStorage.setItem('isLoggedin', JSON.stringify(datanya2));
          this.loadprofile();
      }, err => {
          console.log(err);
          alert("Ganti Profil Gagal "+err)
      })    
    }
} 
