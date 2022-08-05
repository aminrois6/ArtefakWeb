import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { routerTransition } from '../router.animations';
import { HttpClient, HttpHeaders, HttpParameterCodec } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Urlservice } from '../shared/services/url.service';
import { ImageService } from '../shared/services/image.service';
import swal from 'sweetalert2';

// const httpOptions : any    = {
//   headers: new HttpHeaders({
//     //'Content-Type':  'application/json',
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Access-Control-Allow-Methods': 'GET',
//     'Access-Control-Allow-Origin': '*'
//   })
// };

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
	datauser: any;
	nama:any;
	email:any;
	password:any;
	password2:any;
	constructor(private http: HttpClient,
		private router:Router,
		private spinner: NgxSpinnerService,
		private url: Urlservice,
		private imageService: ImageService,
		) {}

   	daftar() {
		   // console.log(this.nama);
		   this.spinner.show();
   		if(this.nama==""||this.nama==undefined) {
			this.spinner.hide();
   			// alert("Nama Tidak Boleh Kosong");
			swal.fire('Nama Tidak Boleh Kosong','','error')
   		} else if(this.email==""||this.email==undefined) {
			this.spinner.hide();
   			// alert("Email Tidak Boleh Kosong");
			   swal.fire('Email Tidak Boleh Kosong','','error')
   		} else if(this.password==""||this.password==undefined) {
			this.spinner.hide();
   			// alert("Password Tidak Boleh Kosong");
			   swal.fire('Password Tidak Boleh Kosong','','error')
   		} else if(this.password!==this.password2) {
			this.spinner.hide();
			//    alert("Repeat Password Tidak Sama");
			   swal.fire('Repeat Password Tidak Sama','','error')
		} else {
   			this.proses();
   		}

	   }
	proses() {
		let formData = new FormData();
            formData.append('email_user', this.email);
            formData.append('password_user', this.password);
			formData.append('nama_user', this.nama);
        	this.http.post(this.url.apiurl+'/users', formData).subscribe(data => {
            	// console.log(data);
            	if (data=="Data Sudah Ada") {
					this.spinner.hide();
            		// alert('Maaf Email Sudah digunakan');
					swal.fire('Maaf Email Sudah digunakan','','error')
            	} else {
					localStorage.removeItem('datagoogle');
            		this.router.navigate(['/login']);
            	}
        	}, err => {
            	console.log(err);
        	});
   			// this.router.navigate(['/dashboard']);
	   }
    ngOnInit() {
		this.spinner.hide();
		this.datauser = JSON.parse(localStorage.getItem('datagoogle'));
		if(this.datauser!==[] || this.datauser !== '' || this.datauser !== undefined) {
			this.email = this.datauser.email;
			this.nama = this.datauser.name;
		}
	}
	login() {
		localStorage.removeItem('datagoogle');
		this.router.navigate(['/login']);
	}
}
