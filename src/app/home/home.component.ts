import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  url: string;
  payload: any;
  headers: any;
  constructor(private http: Http) { }

  Pizzas = [];
  
  async ngOnInit() {
    this.url ='http://192.168.0.14:50998/api/Menu/GetPizza'
    this.payload = {
      Name: 'Test'
    }
    var variables = JSON.stringify(this.payload)
    this.post(this.url, variables)
  }
  async post(url, payload){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    try {
      const response = await this.http.post(url, payload, {headers: headers}).toPromise();
      if (response.status === 200) {
        const res = response.json();
        if (res.errorCode === 0 || res.errorCode === 15) {
          this.Pizzas = JSON.parse(res.result);
          console.log(this.Pizzas);
        } else {
          return false;
        }
      }
    } catch (e) {
      return e.json();
    }
  }
}
