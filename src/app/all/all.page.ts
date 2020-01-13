import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders} from "@angular/common/http";
// import { Observable } from "rxjs/observable";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";



@Component({
  selector: 'app-all',
  templateUrl: './all.page.html',
  styleUrls: ['./all.page.scss'],
})
export class AllPage implements OnInit {
  baseUrl = 'http://localhost:3000/users'
  person:any
  constructor(private http: HttpClient, private router: Router, private toast: ToastController) { }

  ngOnInit() {
    this.get()
  }

ionViewDidEnter(){
  this.get()
}
  get(){
    this.http.get(this.baseUrl).subscribe( res => {
      console.log(res);
      this.person = res;
    })
  }
  async showToast(msg){
    const toast = await this.toast.create({
      message: msg,
      duration: 1000,
      color:'dark',
      position:'middle'
    });
    toast.present()
  }
  delete(i){
    this.http.delete(`${this.baseUrl}/${i.id}`).subscribe( ()=> {
      this.showToast(`${i.name} was deleted successfully`);
      this.get()
    })
  }

  alert(i){
    this.router.navigateByUrl(`edit:${i.id}`)
  }

  update(i){
    // alert(i)
    this.router.navigateByUrl(`edit/${i}`)


  }

  addNew(){
    this.router.navigateByUrl('addNew')
  }
}
