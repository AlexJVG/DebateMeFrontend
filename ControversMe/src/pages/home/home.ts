import { Component } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { NavController, ToastController } from 'ionic-angular';
import { HomePage1 } from '../home/home.1';
import { Main } from '../mainpage/main';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cred = { username: '', password: ''};  
  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController, private storage: Storage) {
 
  }
  signIn(){
    if (this.cred.username != ""){
      if (this.cred.password != ""){
        this.sendPostRequest();       
      }else{
        this.presentToast("No Password");        
      }
    }else{
      this.presentToast("No Username");      
    }
  }
  register() {
    this.navCtrl.push(HomePage1);
  }
  presentToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  sendPostRequest() {
        this.storage.set("email", this.cred.username);
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        const requestOptions = new RequestOptions({ headers: headers});
    
        let postData = {
                "email": this.cred.username,
                "password": this.cred.password
                
        }
        this.http.get("http://192.168.10.14:8080/api/rooms", requestOptions)
          .subscribe((data: any) => {
          data._body = JSON.parse(data._body);
          console.log(data);
          if (data._body.success == true){
              this.storage.set('rooms', data._body);
              console.log(data._body);
              

            for (let room in data._body.data) {
              console.log(room);
              console.log(data._body.data[room]);
            }

          }else{
              this.presentToast(data._body.error);
          }
          }, error => {
          console.log(error);
        });
    
        this.http.post("http://192.168.10.14:8080/api/login", postData, requestOptions)
          .subscribe((data: any) => {
            console.log(data);
            if (JSON.parse(data._body).success == true){
                this.storage.set('token', JSON.parse(data._body).data.token);                
                console.log(JSON.parse(data._body).data.token);
                this.navCtrl.push(Main);                                            
                
            }else{
                this.presentToast(JSON.parse(data._body).error);
            }
            }, error => {
            console.log(error);
          });
   
          
        }

        
        //http://192.168.7.165:8080/api/rooms
}
