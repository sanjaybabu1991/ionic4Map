import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminPage } from '../../pages/admin/admin';

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gotToAdmin()
  {
    this.navCtrl.push(AdminPage)
  }


  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad IndexPage');
  // }

}
