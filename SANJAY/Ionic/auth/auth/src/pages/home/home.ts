import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminPage } from '../pages/admin/admin';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController,public navParams: NavParams, public authData: AuthData) 
    {
    }
  
  gotToAdmin()
  {
    this.navCtrl.push(AdminPage)
  }

  logOut() {
      this.authData.logoutUser().then(() => {
          this.navCtrl.setRoot(Login);
      });
  }
}
