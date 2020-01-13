import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  baseUrl='http://localhost:3000/users'
  new = {}

  
  constructor(private http: HttpClient, private router:Router) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  ngOnInit() {
  }

  add(data) {
    console.log(data)
    // data = JSON.stringify(this.new)
    this.http.post(this.baseUrl, JSON.stringify(data), this.httpOptions).subscribe(res => console.log(res));
    this.router.navigateByUrl('all')
    
  }


}
