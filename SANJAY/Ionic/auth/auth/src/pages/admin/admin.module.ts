import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

//import { AdminPage } from './admin';
import { AdminPage } from './admin/admin';
@NgModule({
  declarations: [
    AdminPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminPage),
  ],
  exports: [
    AdminPage
  ]
})
export class AdminPageModule {}

