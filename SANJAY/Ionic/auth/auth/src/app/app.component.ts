import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AdminPage } from '../admin/admin';

import firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

      // Initialize Firebase  
    const config = {
        apiKey: 'AIzaSyCcc2Hxk2AGI9fLF6y7QC1yxF7UqTjy9gM',
        authDomain: "geotracker-a4855.firebaseapp.com",
        databaseURL: "https://geotracker-a4855.firebaseio.com",
        projectId: "geotracker-a4855",
        storageBucket: "geotracker-a4855.appspot.com",
        messagingSenderId: "766037115636"
    };
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged((user) => 
        {
            if (!user) {
                console.log("not login");
                this.rootPage = Login;

            } else {
                console.log("login");
                this.rootPage = HomePage;
            }
        });
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
           // firebase.initializeApp(config);
        });
    }
}

