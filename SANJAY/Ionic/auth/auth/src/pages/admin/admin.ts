import { Component, ViewChild, ElementRef  } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
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
  trackMobileNo;
    
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  temp : any;
  
  markers = [];
  ref = firebase.database().ref('geolocations/');
  
  public simInfo: any;
  public cards: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private geolocation: Geolocation,private device: Device) 
  {
    // platform.ready().then(() => {
      
    // })
  }
  
  //functions
  gotToAdmin2()
  {  
    var tempMobileNo = this.trackMobileNo;
    this.ref.on("value", function(snapshot) 
    {
       var tempCords = snapshot.val()[tempMobileNo];

       if(tempCords)
       {
        localStorage.setItem('latitude',tempCords.latitude);
        localStorage.setItem('longitude',tempCords.longitude);
        
       }
      
     // console.log(snapshot.val());
    }, function (error) {
      console.log("Error: " + error.code);
   });
   

   //console.log(this.trackMobileNo);
   var latitude = localStorage.getItem('latitude');
   var longitude = localStorage.getItem('longitude'); 
   this.initMap(latitude,longitude)
    
   // this.navCtrl.push(AdminPage)
  }

  initMap(latitude,longitude) 
  { 
    console.log('initMap');
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => 
    {
          
      let mylocation = new google.maps.LatLng(latitude,longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, 
      {
        zoom: 15,
        center: mylocation
      },(err) => {
        console.log(err);
      });;
    });
    let watch = this.geolocation.watchPosition();

    watch.subscribe((data) => {
      this.deleteMarkers();
      //this.updateGeolocation(this.device.uuid, latitude,longitude);
      
      let updatelocation = new google.maps.LatLng(latitude,longitude);
      let image = 'assets/imgs/location2.png';
      this.addMarker(updatelocation,image);
      this.setMapOnAll(this.map);
     // console.log(this.device.uuid);
    });
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

  //from update firebase
  updateGeolocation(uuid, lat, lng) 
  {
   // console.log(localStorage.getItem('mykey'));
      let userId = '9575353073';
      let pass = 1234;
    if(localStorage.getItem('mykey')) 
    { 
      firebase.database().ref('geolocations/'+userId).set({
        uuid: uuid,
        latitude: lat,
        longitude : lng,
        userId:userId,
        pass:pass,
        time: new Date().getTime()
      });
    }else 
    {
      //console.log('not found');
      let newData = this.ref.push();
      newData.set({
        uuid: uuid,
        latitude: lat,
        longitude: lng,
        userId:userId,
        pass:pass,
        time: new Date().getTime()
        
      });
      localStorage.setItem('mykey',userId)
    }
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
