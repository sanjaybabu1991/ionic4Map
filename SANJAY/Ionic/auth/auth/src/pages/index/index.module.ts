import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexPage } from '../../pages/index/index';

@NgModule({
  declarations: [
    IndexPage,
  ],
  imports: [
    IonicPageModule.forChild(IndexPage),
  ],
})
export class IndexPageModule {}
