import { Injectable } from '@angular/core';
/*
  Generated class for the RestProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Urlservice{
  apiurl = 'https://amin-be.gradientsdev.com/api';
  apidownload = 'https://amin-be.gradientsdev.com/storage/';
  apigambar = 'https://amin-be.gradientsdev.com/';
  // apiurl = 'http://192.168.101.33:8000/api';
  // apigambar = 'http://192.168.101.33:8000/'; 
}