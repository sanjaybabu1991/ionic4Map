import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
    rootPage:any = Login;

    constructor(private backgroundMode: BackgroundMode,private backgroundGeolocation: BackgroundGeolocation, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private geolocation: Geolocation,private device: Device) 
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

        const config2: BackgroundGeolocationConfig = {
            desiredAccuracy: 0,
            stationaryRadius: 20,
            distanceFilter: 30,
            interval: 1000,
            debug: true, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
        };

        firebase.initializeApp(config);
        
        firebase.auth().onAuthStateChanged((user) => 
        {
            if(!user) 
            {
                console.log("not login");
                this.rootPage = Login;
            }else 
            {
                this.backgroundGeolocation.start();
                this.backgroundMode.enable();
                        
                this.backgroundGeolocation.configure(config2).subscribe((location: BackgroundGeolocationResponse) => 
                {     
                    var database = firebase.database();
                    var ref  = database.ref('userProfile');
                
                    ref.on("value", function(data) 
                    {
                        var tempdata =  data.val();
                        var keys = Object.keys(tempdata);
                        keys.forEach(function(element) 
                        {
                            if(tempdata[element].email == user.email)
                            {
                                localStorage.setItem('mobId',element)
                                return false; 
                            }
                        })
                    },function (error) 
                    {
                        console.log("Error: " + error.code);
                    });
                    ////update location
                    let watch = this.geolocation.watchPosition();
                    watch.subscribe((data) => 
                    {
                        this.updateGeolocation(this.device.uuid, location.latitude,location.longitude);
                    })

                    this.rootPage = HomePage;
                                
                },(err) => 
                {
                    alert(err);
                    console.log(err);             
                });
            }
        });
        
        
        platform.ready().then(() => 
        {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    

    //functions
    updateGeolocation(uuid, lat, lng) 
    {
      
        let userId = localStorage.getItem('mobId');

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
        }
    } 
}

