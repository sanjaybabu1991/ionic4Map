import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
//import { AdminPage } from '../admin/admin';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
//sim

import firebase, { database } from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
    rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private geolocation: Geolocation,private device: Device) 
  {
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
                
                //console.log("login");
                var database = firebase.database();
                var ref  = database.ref('userProfile');
                
                ref.on("value", function(data) 
                {
                    var tempdata =  data.val();
                    var keys = Object.keys(tempdata)
                    //console.log(keys);
                    keys.forEach(function(element) 
                    {
                        if(tempdata[element].mobileNo == element)
                        {
                            localStorage.setItem('mobId',tempdata[element].mobileNo)
                            return false; 
                        }
                    })

                    

                    //////
                }, function (error) {
                  console.log("Error: " + error.code);
                });

                this.rootPage = HomePage;
            }
        });
        
        ////update location
        let watch = this.geolocation.watchPosition();

        watch.subscribe((data) => {
            this.updateGeolocation(this.device.uuid, data.coords.latitude,data.coords.longitude);
        })

        ////////
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
           // firebase.initializeApp(config);
        });
    }


    updateGeolocation(uuid, lat, lng) 
    {
     // console.log(localStorage.getItem('mykey'));
        let userId = localStorage.getItem('mobId');
       // let pass = 1234;
      if(userId) 
      { 
        firebase.database().ref('geolocations/'+userId).set({
          uuid: uuid,
          latitude: lat,
          longitude : lng,
          time: new Date().getTime()
        });
      }else 
      {
        console.log('not found');
        var database = firebase.database();
        var ref  = database.ref('geolocations/'+userId);
        let newData = ref.push();
          newData.set({
          uuid: uuid,
          latitude: lat,
          longitude: lng,
          time: new Date().getTime()
          
        });
       // localStorage.setItem('mykey',userId)
      }
    } 








////    
}

