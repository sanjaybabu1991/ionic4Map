import { Component, ViewChild, ElementRef  } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
//sim
//import { Sim } from '@ionic-native/sim';
import * as firebase from 'firebase';
declare var google: any;

//@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage 
{   
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  temp : any;
  trackMobileNo; 
  markers = [];
  ref = firebase.database().ref('geolocations/');
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private geolocation: Geolocation,public authData: AuthData,private device: Device) 
  {
    platform.ready().then(() => {
      
    })
  }
  
  //functions
  gotToAdmin2()
  {
    var tempMobileNo = this.trackMobileNo;
    var tempCords =null ;
    
    this.ref.on("value", function(snapshot) 
    {
      tempCords = snapshot.val()[tempMobileNo]; 
      //console.log(tempCords)
    },function (error) 
    {
      console.log("Error: " + error.code);
    });
   
    setTimeout(function()
    {
      this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => 
      {
        let mylocation = new google.maps.LatLng(tempCords.latitude,tempCords.longitude);
        this.map = new google.maps.Map(this.mapElement.nativeElement, 
        {
          zoom: 15,
          center: mylocation
        },(err) => {
          alert(err);
        })
      })

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        this.deleteMarkers();
        var tempCords2 = null;
        this.ref.on("value", function(snapshot) 
        {
          tempCords2 = snapshot.val()[tempMobileNo]; 
          console.log(tempCords2)
        },function (error) 
        {
          console.log("Error: " + error.code);
        });
     
        setTimeout(function()
        {
          let updatelocation = new google.maps.LatLng(tempCords2.latitude,tempCords2.longitude);
          let image = 'assets/imgs/location2.png';
          this.addMarker(updatelocation,image);
          this.setMapOnAll(this.map);
        }.bind(this),1000);
      });
    }.bind(this),1000);

   // this.navCtrl.push(AdminPage)
  }
 
  

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image,
      animation: google.maps.Animation.DROP
    });
    this.markers.push(marker);
  
}
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.setMapOnAll(null);
  }
  
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }


  //logout
  logOut() 
  {
    this.authData.logoutUser().then(() => {
        this.navCtrl.setRoot(Login);
    });
  }
  
}



export const snapshotToArray = snapshot => 
{
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};