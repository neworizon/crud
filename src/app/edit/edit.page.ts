import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from "@angular/router";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { environment } from "../../environments/environment";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  baseUrl = environment.baseUrl
  id;
  selectedEmployee :any={name:'',phone:'',id:''};
  constructor(
    private route : ActivatedRoute, 
    private http: HttpClient, 
    private router: Router,
    private navCtrl: NavController) { }

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
    // this.router.navigateByUrl('all')
    this.navCtrl.navigateRoot('all')
    
  }
}
