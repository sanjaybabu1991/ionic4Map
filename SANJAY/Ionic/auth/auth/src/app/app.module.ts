import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
//import { HomePage } from '../../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import {ResetPassword}from '../pages/reset-password/reset-password';
import {Signup} from '../pages/signup/signup';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthData } from '../providers/auth-data';
import { AdminPage } from '../pages/admin/admin';
import { HomePage } from '../pages/home/home';
import { IndexPage } from '../pages/index/index';

import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';

//import { Sim } from '@ionic-native/sim';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
      TabsPage,
      Login,
      ResetPassword,
      Signup,
      AdminPage,
      IndexPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
   // IonicPageModule.forChild(AdminPage)
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
      TabsPage,
      Login,
      ResetPassword,
      Signup,
      IndexPage,
      AdminPage
  ],
  providers: [
      AuthData,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Device
  //  Sim
    
  ]
})
export class AppModule {}


