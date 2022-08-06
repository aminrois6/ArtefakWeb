import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { HttpClient, } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService, SocialUser, GoogleLoginProvider } from 'angular-6-social-login';
import { reject } from 'q';
import { Urlservice } from '../shared/services/url.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    
  public user: any = SocialUser;
    constructor(
      public router: Router,
      public http: HttpClient,
      private spinner: NgxSpinnerService,
      private socialAuthService: AuthService,
      private url: Urlservice,
    ) {}

    ngOnInit() {
        this.spinner.hide();
        let currentTime:number = new Date().getTime();
        console.log(currentTime);
    } 
    googlelogin(){
    //     this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=>{
    //         this.user = userData;
    //         console.log(userData.email);
    //   }); 
            this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=>{
                this.user = userData;
                // console.log(userData);
                this.logingoogle();
            }).catch(function (err) {err = {error: "popup_closed_by_user"}
            reject(err);
        }); 
    }
    logingoogle(){
        let formData = new FormData();
            formData.append('email_user', this.user.email);
            formData.append('nama_user', this.user.name);
        	this.http.post(this.url.apiurl+'/users/carigoogle', formData).subscribe(data => {
            	console.log(data);
            	if (data=="Data Kosong"){
					this.spinner.hide();
                    alert('Maaf Email Anda Belum Terdaftar di Aplikasi Ini, Silahkan Daftar');
                    localStorage.setItem('datagoogle', JSON.stringify(this.user));
                    this.router.navigate(['/signup']);
            	}else{
                    localStorage.setItem('isLoggedin', JSON.stringify(data));
                    this.router.navigate(['/project']);
                    // console.log(data)
            	}
        	}, err => {
            	console.log(err);
        	}) 
    }

    onLoggedin(email, password) {
        this.spinner.show();
        if(email==""||email==undefined){
                this.spinner.hide();
                // alert("Email Tidak Boleh Kosong");
                swal.fire('Email Tidak Boleh Kosong','','error')
            //    alert("Email Harus di Isi");
           }else if(password==""||password==undefined){
                this.spinner.hide();
                // alert("Password Tidak Boleh Kosong");
                swal.fire('Password Tidak Boleh Kosong','','error')
            //    alert("Password Harus di Isi");
           }else {
            let formData = new FormData();
            formData.append('email_user', email);
            formData.append('password_user', password);
            this.http.post(this.url.apiurl+'/users/login', formData).subscribe(data => {
                console.log(data);
                if (data=="Data Kosong"){
                    this.spinner.hide();
                    // alert('Email atau Password Salah');
                    swal.fire('Email atau Password Salah','','error')
                    // alert('Email atau Password Salah');
                }else{
                    localStorage.setItem('isLoggedin', JSON.stringify(data));
                    this.router.navigate(['/project']);
                    
                }
            }, err => {
                console.log(err);
            }) 
             // localStorage.setItem('isLoggedin', 'true');
        }
       
    }
}
