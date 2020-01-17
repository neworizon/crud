import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from "@angular/router";
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  baseUrl = 'http://localhost:3000/users'
  id;
  selectedEmployee :any={name:'',phone:'',id:''};
  constructor(private route : ActivatedRoute, private http: HttpClient, private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    // console.log(`${this.baseUrl}/${this.id}`);
    this.http.get(`${this.baseUrl}/${this.id}`).subscribe( res => {
      this.selectedEmployee = res;
      console.log(this.selectedEmployee);
    })
  }


  update() {
    let updatedData ={
      id: this.selectedEmployee.id,
      name: this.selectedEmployee.name,
      phone: this.selectedEmployee.phone
    }
    // data = JSON.stringify(this.new)
    this.http.put(`${this.baseUrl}/${this.id}`, JSON.stringify(updatedData), this.httpOptions).subscribe(res => console.log(res));
    this.router.navigateByUrl('all')
    
  }
}
