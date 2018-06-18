webpackJsonp([3],{

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminPage; });
/* unused harmony export snapshotToArray */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//sim
//import { Sim } from '@ionic-native/sim';

//@IonicPage()
var AdminPage = /** @class */ (function () {
    function AdminPage(navCtrl, navParams, platform, geolocation, device) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.geolocation = geolocation;
        this.device = device;
        this.markers = [];
        this.ref = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref('geolocations/');
        platform.ready().then(function () {
            // this.initMap();  
            // this.getSimData(); 
            // var temp;
            // //sim info
            // this.sim.getSimInfo().then(
            // (info) => //console.log('Sim info: ', info),
            //  this.temp =JSON.stringify(info),
            // (err) => alert('Unable to get sim info: ')
            // );
            //     this.sim.hasReadPermission().then(
            //   (info) => console.log('Has permission: ', info)
            // );
            // this.sim.requestReadPermission().then(
            //   () => console.log('Permission granted'),
            //   () => console.log('Permission denied')
            // );
            // });
            // this.ref.on('value', resp => 
            // {
            //   this.deleteMarkers();
            //   snapshotToArray(resp).forEach(data => 
            //   {
            //     if(data.uuid !== this.device.uuid) {
            //       let image = 'assets/imgs/location2.png';
            //       let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
            //       this.addMarker(updatelocation,image);
            //       this.setMapOnAll(this.map);
            //     } else {
            //       let image = 'assets/imgs/location2.png';
            //       let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
            //       this.addMarker(updatelocation,image);
            //       this.setMapOnAll(this.map);
            //     }
            //   });
            // });
            // this.sim.hasReadPermission().then(
            //   (info) => console.log('Has permission: ', info)
            // );
            // this.sim.requestReadPermission().then(
            //   () => console.log('Permission granted'),
            //   () => console.log('Permission denied')
            // );
        });
    }
    //functions
    AdminPage.prototype.gotToAdmin2 = function () {
        this.ref.on("value", function (snapshot) {
            console.log(snapshot.val());
        }, function (error) {
            console.log("Error: " + error.code);
        });
        this.initMap();
        //console.log('called');
        // this.navCtrl.push(AdminPage)
    };
    AdminPage.prototype.initMap = function () {
        var _this = this;
        this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then(function (resp) {
            var mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, {
                zoom: 15,
                center: mylocation
            }, function (err) {
                console.log(err);
            });
            ;
        });
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (data) {
            _this.deleteMarkers();
            _this.updateGeolocation(_this.device.uuid, data.coords.latitude, data.coords.longitude);
            var updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
            var image = 'assets/imgs/location2.png';
            _this.addMarker(updatelocation, image);
            _this.setMapOnAll(_this.map);
            // console.log(this.device.uuid);
        });
    };
    AdminPage.prototype.addMarker = function (location, image) {
        var marker = new google.maps.Marker({
            position: location,
            map: this.map,
            icon: image,
            animation: google.maps.Animation.DROP
        });
        this.markers.push(marker);
    };
    AdminPage.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    };
    AdminPage.prototype.clearMarkers = function () {
        this.setMapOnAll(null);
    };
    AdminPage.prototype.deleteMarkers = function () {
        this.clearMarkers();
        this.markers = [];
    };
    //from update firebase
    AdminPage.prototype.updateGeolocation = function (uuid, lat, lng) {
        // console.log(localStorage.getItem('mykey'));
        var userId = '9575353073';
        var pass = 1234;
        if (localStorage.getItem('mykey')) {
            __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref('geolocations/' + userId).set({
                uuid: uuid,
                latitude: lat,
                longitude: lng,
                userId: userId,
                pass: pass,
                time: new Date().getTime()
            });
        }
        else {
            //console.log('not found');
            var newData = this.ref.push();
            newData.set({
                uuid: uuid,
                latitude: lat,
                longitude: lng,
                userId: userId,
                pass: pass,
                time: new Date().getTime()
            });
            localStorage.setItem('mykey', userId);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], AdminPage.prototype, "mapElement", void 0);
    AdminPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-admin',template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\admin\admin.html"*/'\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Admin</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n <ion-list >\n\n    <ion-item>\n\n      <ion-label floating>Mobile No.</ion-label>\n\n      <ion-input type="number"></ion-input>\n\n    </ion-item>\n\n    <br /><br />\n\n    <!-- <button ion-button block>Track</button> -->\n\n    <button ion-button (click) = "gotToAdmin2()">Go To Admin</button>\n\n    {{temp}}\n\n  </ion-list> \n\n\n\n  \n\n    <!-- map -->\n\n  <div #map id="map" style="height: 100%;"></div>\n\n \n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <ion-toolbar>\n\n    <ion-title><small>Copyright 2018</small></ion-title>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n\n\n\n\n'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\admin\admin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */]])
    ], AdminPage);
    return AdminPage;
}());

var snapshotToArray = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};
//# sourceMappingURL=admin.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailValidator; });
var EmailValidator = /** @class */ (function () {
    function EmailValidator() {
    }
    EmailValidator.isValid = function (control) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
        if (re) {
            return null;
        }
        return { "invalidEmail": true };
    };
    return EmailValidator;
}());

//# sourceMappingURL=email.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validators_email__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_data__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reset_password_reset_password__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__signup_signup__ = __webpack_require__(147);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Login = /** @class */ (function () {
    function Login(navCtrl, navParams, formBuilder, alertCtrl, loadingCtrl, authData, nav) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.authData = authData;
        this.nav = nav;
        this.loginForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__validators_email__["a" /* EmailValidator */].isValid])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    Login.prototype.loginUser = function () {
        var _this = this;
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(function (authData) {
                _this.loading.dismiss().then(function () {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    Login.prototype.goToSignup = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__signup_signup__["a" /* Signup */]);
    };
    Login.prototype.goToResetPassword = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_6__reset_password_reset_password__["a" /* ResetPassword */]);
    };
    Login = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\login\login.html"*/'<!--\n\n  Generated template for the Login page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>login</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content id="login" >\n\n\n\n     <form [formGroup]="loginForm" (submit)="loginUser()" novalidate>\n\n         <!--divs-->\n\n            <div class="row responsive-md">\n\n                <div class="col col-50 col-offset-25">\n\n                        <!---->\n\n\n\n    <ion-item>\n\n      <ion-label stacked>Email</ion-label>\n\n      <ion-input #email formControlName="email" type="email" placeholder="Your email address" \n\n        [class.invalid]="!loginForm.controls.email.valid && loginForm.controls.email.dirty"></ion-input>\n\n    </ion-item>\n\n    <ion-item class="error-message" \n\n      *ngIf="!loginForm.controls.email.valid  && loginForm.controls.email.dirty">\n\n      <p>Please enter a valid email.</p>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label stacked>Password</ion-label>\n\n      <ion-input #password formControlName="password" type="password" placeholder="Your password" \n\n        [class.invalid]="!loginForm.controls.password.valid && loginForm.controls.password.dirty"></ion-input>\n\n    </ion-item>\n\n    <ion-item class="error-message" \n\n      *ngIf="!loginForm.controls.password.valid  && loginForm.controls.password.dirty">\n\n      <p>Your password needs more than 6 characters.</p>\n\n    </ion-item>\n\n\n\n    <button ion-button block type="submit">\n\n      Login\n\n    </button>\n\n                     <button ion-button block clear (click)="goToSignup()">\n\n      Create a new account\n\n    </button>\n\n\n\n    <button ion-button block clear (click)="goToResetPassword()">\n\n      I forgot my password\n\n    </button>\n\n\n\n   </div>\n\n    </div>\n\n\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_data__["a" /* AuthData */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], Login);
    return Login;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassword; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_data__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_email__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ResetPassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ResetPassword = /** @class */ (function () {
    function ResetPassword(authData, formBuilder, nav, loadingCtrl, alertCtrl) {
        this.authData = authData;
        this.formBuilder = formBuilder;
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.resetPasswordForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validators_email__["a" /* EmailValidator */].isValid])],
        });
    }
    /**
     * If the form is valid it will call the AuthData service to reset the user's password displaying a loading
     *  component while the user waits.
     *
     * If the form is invalid it will just log the form value, feel free to handle that as you like.
     */
    ResetPassword.prototype.resetPassword = function () {
        var _this = this;
        if (!this.resetPasswordForm.valid) {
            console.log(this.resetPasswordForm.value);
        }
        else {
            this.authData.resetPassword(this.resetPasswordForm.value.email).then(function (user) {
                var alert = _this.alertCtrl.create({
                    message: "We just sent you a reset link to your email",
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel',
                            handler: function () {
                                _this.nav.pop();
                            }
                        }
                    ]
                });
                alert.present();
            }, function (error) {
                var errorMessage = error.message;
                var errorAlert = _this.alertCtrl.create({
                    message: errorMessage,
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                errorAlert.present();
            });
        }
    };
    ResetPassword = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-reset-password',template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\reset-password\reset-password.html"*/'<!--\n  Generated template for the ResetPassword page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>reset-password</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n     <form [formGroup]="resetPasswordForm" (submit)="resetPassword()" novalidate>\n\n\n\n    <ion-item>\n\n      <ion-label stacked>Email</ion-label>\n\n      <ion-input #email formControlName="email" type="email" placeholder="Your email address" \n\n        [class.invalid]="!resetPasswordForm.controls.email.valid && resetPasswordForm.controls.email.dirty">\n\n        </ion-input>\n\n    </ion-item>\n\n    <ion-item class="error-message" \n\n      *ngIf="!resetPasswordForm.controls.email.valid  && resetPasswordForm.controls.email.dirty">\n\n      <p>Please enter a valid email.</p>\n\n    </ion-item>\n\n\n\n    <button ion-button block type="submit">\n\n      Reset your Password\n\n    </button>\n\n\n\n  </form>\n</ion-content>\n'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\reset-password\reset-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_auth_data__["a" /* AuthData */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */]])
    ], ResetPassword);
    return ResetPassword;
}());

//# sourceMappingURL=reset-password.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Signup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_data__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_email__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Signup = /** @class */ (function () {
    function Signup(nav, authData, formBuilder, loadingCtrl, alertCtrl) {
        this.nav = nav;
        this.authData = authData;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.signupForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validators_email__["a" /* EmailValidator */].isValid])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            mobileNo: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    /**
     * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
     *  component while the user waits.
     *
     * If the form is invalid it will just log the form value, feel free to handle that as you like.
     */
    Signup.prototype.signupUser = function () {
        var _this = this;
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        }
        else {
            this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.name, this.signupForm.value.mobileNo)
                .then(function () {
                _this.loading.dismiss().then(function () {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    Signup = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\signup\signup.html"*/'<!--\n\n  Generated template for the Signup page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>signup</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n     <form [formGroup]="signupForm" (submit)="signupUser()" novalidate>\n\n   \n\n    <ion-item>\n\n      <ion-label stacked>Email</ion-label>\n\n      <ion-input #email formControlName="email" type="email" placeholder="Your email address" \n\n        [class.invalid]="!signupForm.controls.email.valid && signupForm.controls.email.dirty">\n\n        </ion-input>\n\n    </ion-item>\n\n    <ion-item class="error-message" \n\n      *ngIf="!signupForm.controls.email.valid  && signupForm.controls.email.dirty">\n\n      <p>Please enter a valid email.</p>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label stacked>Password</ion-label>\n\n      <ion-input #password formControlName="password" type="password" placeholder="Your password" \n\n        [class.invalid]="!signupForm.controls.password.valid && signupForm.controls.password.dirty">\n\n        </ion-input>\n\n    </ion-item>\n\n    <ion-item class="error-message" \n\n      *ngIf="!signupForm.controls.password.valid  && signupForm.controls.password.dirty">\n\n      <p>Your password needs more than 6 characters.</p>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label stacked>Name</ion-label>\n\n      <ion-input #name formControlName="name" type="text" placeholder="Your Name" \n\n        [class.invalid]="!signupForm.controls.name.valid && signupForm.controls.name.dirty">\n\n        </ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label stacked>Mobile No</ion-label>\n\n      <ion-input #mobileNo formControlName="mobileNo" type="text" placeholder="Mobile No" \n\n        [class.invalid]="!signupForm.controls.mobileNo.valid && signupForm.controls.mobileNo.dirty">\n\n        </ion-input>\n\n    </ion-item>\n\n\n\n    <button ion-button block type="submit">\n\n      Create an Account\n\n    </button>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_data__["a" /* AuthData */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], Signup);
    return Signup;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 156;

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/index/index.module": [
		441,
		2
	],
	"../pages/reset-password/reset-password.module": [
		442,
		1
	],
	"../pages/signup/signup.module": [
		443,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 197;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\tabs\tabs.html"*/'<ion-tabs>\n\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\about\about.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      About\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\contact\contact.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Contact\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n\n    <ion-item>\n\n      <ion-icon name="ionic" item-left></ion-icon>\n\n      @ionicframework\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_admin_admin__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IndexPage = /** @class */ (function () {
    function IndexPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    IndexPage.prototype.gotToAdmin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_admin_admin__["a" /* AdminPage */]);
    };
    IndexPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-index',template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\index\index.html"*/'<!--\n\n  Generated template for the IndexPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>index</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n<button ion-button (click) = "gotToAdmin()">Go To Admin</button>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\index\index.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], IndexPage);
    return IndexPage;
}());

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(308);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_reset_password_reset_password__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_auth_data__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_admin_admin__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_home__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_index_index__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_device__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






//import { HomePage } from '../../pages/home/home';












//import { Sim } from '@ionic-native/sim';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* Login */],
                __WEBPACK_IMPORTED_MODULE_8__pages_reset_password_reset_password__["a" /* ResetPassword */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* Signup */],
                __WEBPACK_IMPORTED_MODULE_13__pages_admin_admin__["a" /* AdminPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_index__["a" /* IndexPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/index/index.module#IndexPageModule', name: 'IndexPage', segment: 'index', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reset-password/reset-password.module#ResetPasswordModule', name: 'ResetPassword', segment: 'reset-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupModule', name: 'Signup', segment: 'signup', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* Login */],
                __WEBPACK_IMPORTED_MODULE_8__pages_reset_password_reset_password__["a" /* ResetPassword */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* Signup */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_index__["a" /* IndexPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_admin_admin__["a" /* AdminPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__providers_auth_data__["a" /* AuthData */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_device__["a" /* Device */]
                //  Sim
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        var _this = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        // Initialize Firebase  
        var config = {
            apiKey: 'AIzaSyCcc2Hxk2AGI9fLF6y7QC1yxF7UqTjy9gM',
            authDomain: "geotracker-a4855.firebaseapp.com",
            databaseURL: "https://geotracker-a4855.firebaseio.com",
            projectId: "geotracker-a4855",
            storageBucket: "geotracker-a4855.appspot.com",
            messagingSenderId: "766037115636"
        };
        __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.initializeApp(config);
        __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth().onAuthStateChanged(function (user) {
            if (!user) {
                console.log("not login");
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* Login */];
            }
            else {
                console.log("login");
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            // firebase.initializeApp(config);
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthData = /** @class */ (function () {
    function AuthData() {
    }
    /**
     * [loginUser We'll take an email and password and log the user into the firebase app]
     * @param  {string} email    [User's email address]
     * @param  {string} password [User's password]
     */
    AuthData.prototype.loginUser = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().signInWithEmailAndPassword(email, password);
    };
    /**
     * [signupUser description]
     * This function will take the user's email and password and create a new account on the Firebase app, once it does
     * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
     * that node to store the profile information.
     * @param  {string} email    [User's email address]
     * @param  {string} password [User's password]
     * @param  {string} name
     * @param  {number} mobileNo
     *
     */
    AuthData.prototype.signupUser = function (email, password, name, mobileNo) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().createUserWithEmailAndPassword(email, password).then(function (newUser) {
            // firebase.database().ref('/users').child(email).set({
            //    firstName: "anonymous",
            //   id:newUser.uid,
            // });
            __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/userProfile/' + mobileNo).set({
                firstName: name,
                email: email,
                mobileNo: mobileNo
            });
        });
    };
    /**
     * [resetPassword description]
     * This function will take the user's email address and send a password reset link, then Firebase will handle the
     * email reset part, you won't have to do anything else.
     *
     * @param  {string} email    [User's email address]
     */
    AuthData.prototype.resetPassword = function (email) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().sendPasswordResetEmail(email);
    };
    /**
     * This function doesn't take any params, it just logs the current user out of the app.
     */
    AuthData.prototype.logoutUser = function () {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().signOut();
    };
    AuthData = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], AuthData);
    return AuthData;
}());

//# sourceMappingURL=auth-data.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_data__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_admin__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { NavController } from 'ionic-angular';




//@IonicPage()
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, authData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authData = authData;
    }
    HomePage.prototype.gotToAdmin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__admin_admin__["a" /* AdminPage */]);
    };
    HomePage.prototype.logOut = function () {
        var _this = this;
        this.authData.logoutUser().then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* Login */]);
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Home</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n   you are authenticated\n\n      <button ion-button icon-only (click)="logOut()"> log out\n\n        <ion-icon name="log-out"></ion-icon>\n\n      </button>\n\n  \n\n\n\n  <button ion-button (click) = "gotToAdmin()">Go To Admin</button>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__providers_auth_data__["a" /* AuthData */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[285]);
//# sourceMappingURL=main.js.map