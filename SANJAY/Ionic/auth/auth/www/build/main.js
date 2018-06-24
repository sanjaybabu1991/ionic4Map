webpackJsonp([3],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminPage; });
/* unused harmony export snapshotToArray */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_data__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
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
    // public simInfo: any;
    // public cards: any;
    function AdminPage(navCtrl, navParams, platform, geolocation, authData, device) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.geolocation = geolocation;
        this.authData = authData;
        this.device = device;
        this.markers = [];
        this.ref = __WEBPACK_IMPORTED_MODULE_6_firebase__["database"]().ref('geolocations/');
        platform.ready().then(function () {
        });
    }
    //functions
    AdminPage.prototype.gotToAdmin2 = function () {
        var tempMobileNo = this.trackMobileNo;
        var tempCords = null;
        //get data from server
        this.ref.on("value", function (snapshot) {
            tempCords = snapshot.val()[tempMobileNo];
        }, function (error) {
            console.log("Error: " + error.code);
        });
        setTimeout(function () {
            if (tempCords != null) {
                this.value = 1;
                this.initMap(tempCords.latitude, tempCords.longitude);
            }
            else {
                alert('Sorry, Unable to track location');
            }
        }.bind(this), 3000);
        // this.navCtrl.push(AdminPage)
    };
    //logout
    AdminPage.prototype.logOut = function () {
        var _this = this;
        this.authData.logoutUser().then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* Login */]);
        });
    };
    AdminPage.prototype.initMap = function (latitude, longitude) {
        var _this = this;
        console.log('initMap');
        ///
        this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then(function (resp) {
            var mylocation = new google.maps.LatLng(latitude, longitude);
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, {
                zoom: 15,
                center: mylocation
            }, function (err) {
                alert(err);
            });
        });
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (data) {
            _this.deleteMarkers();
            //this.updateGeolocation(this.device.uuid, latitude,longitude);  
            var updatelocation = new google.maps.LatLng(latitude, longitude);
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
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]) === "function" && _a || Object)
    ], AdminPage.prototype, "mapElement", void 0);
    AdminPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-admin',template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\admin\admin.html"*/'\n\n<ion-header>\n\n  \n\n  <ion-navbar hideBackButton="true" color="primary">\n\n    \n\n    <ion-title>Live Track</ion-title>\n\n  </ion-navbar>\n\n\n\n  <button ion-button small color="danger" (click)="logOut()" float-right><ion-icon name="power"></ion-icon>\n\n  </button>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n <ion-list [hidden]="value">\n\n    <ion-item>\n\n      <ion-label floating>Mobile No.</ion-label>\n\n      <ion-input type="number" [(ngModel)]="trackMobileNo"></ion-input>\n\n      \n\n    </ion-item>\n\n    <br /><br />\n\n    <!-- <button ion-button block>Track</button> -->\n\n    <button ion-button (click)="gotToAdmin2()">Track</button>\n\n  </ion-list> \n\n \n\n  \n\n    <!-- map -->\n\n  <div #map id="map" style="height: 100%;"></div>\n\n \n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <ion-toolbar>\n\n    <ion-title><small>Copyright 2018</small></ion-title>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n\n\n\n\n'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\admin\admin.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__providers_auth_data__["a" /* AuthData */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_auth_data__["a" /* AuthData */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */]) === "function" && _g || Object])
    ], AdminPage);
    return AdminPage;
    var _a, _b, _c, _d, _e, _f, _g;
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

/***/ 126:
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

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassword; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_data__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_email__ = __webpack_require__(126);
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
            selector: 'page-reset-password',template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\reset-password\reset-password.html"*/'\n\n<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>Reset- Password</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n     <form [formGroup]="resetPasswordForm" (submit)="resetPassword()" novalidate>\n\n\n\n    <ion-item>\n\n      <ion-label stacked>Email</ion-label>\n\n      <ion-input #email formControlName="email" type="email" placeholder="Your email address" \n\n        [class.invalid]="!resetPasswordForm.controls.email.valid && resetPasswordForm.controls.email.dirty">\n\n        </ion-input>\n\n    </ion-item>\n\n    <ion-item class="error-message" \n\n      *ngIf="!resetPasswordForm.controls.email.valid  && resetPasswordForm.controls.email.dirty">\n\n      <p>Please enter a valid email.</p>\n\n    </ion-item>\n\n\n\n    <button ion-button block type="submit">\n\n      Reset your Password\n\n    </button>\n\n  </form>\n\n</ion-content>\n\n\n\n\n\n<ion-footer>\n\n  <ion-navbar color="primary" >\n\n    <ion-title>Copyright 2018 <small>Version 1.0</small></ion-title>\n\n  </ion-navbar>\n\n</ion-footer>'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\reset-password\reset-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_auth_data__["a" /* AuthData */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */]])
    ], ResetPassword);
    return ResetPassword;
}());

//# sourceMappingURL=reset-password.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Signup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_data__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_email__ = __webpack_require__(126);
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
            selector: 'page-signup',template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\signup\signup.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>SIGN UP</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n     <form [formGroup]="signupForm" (submit)="signupUser()" novalidate>\n\n   \n\n    <ion-item>\n\n      <ion-label stacked>Email</ion-label>\n\n      <ion-input #email formControlName="email" type="email" placeholder="Your email address" \n\n        [class.invalid]="!signupForm.controls.email.valid && signupForm.controls.email.dirty">\n\n        </ion-input>\n\n    </ion-item>\n\n    <ion-item class="error-message" \n\n      *ngIf="!signupForm.controls.email.valid  && signupForm.controls.email.dirty">\n\n      <p>Please enter a valid email.</p>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label stacked>Password</ion-label>\n\n      <ion-input #password formControlName="password" type="password" placeholder="Your password" \n\n        [class.invalid]="!signupForm.controls.password.valid && signupForm.controls.password.dirty">\n\n        </ion-input>\n\n    </ion-item>\n\n    <ion-item class="error-message" \n\n      *ngIf="!signupForm.controls.password.valid  && signupForm.controls.password.dirty">\n\n      <p>Your password needs more than 6 characters.</p>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label stacked>Name</ion-label>\n\n      <ion-input #name formControlName="name" type="text" placeholder="Your Name" \n\n        [class.invalid]="!signupForm.controls.name.valid && signupForm.controls.name.dirty">\n\n        </ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label stacked>Mobile No</ion-label>\n\n      <ion-input #mobileNo formControlName="mobileNo" type="text" placeholder="Mobile No" \n\n        [class.invalid]="!signupForm.controls.mobileNo.valid && signupForm.controls.mobileNo.dirty">\n\n        </ion-input>\n\n    </ion-item>\n\n\n\n    <button ion-button block type="submit">\n\n      Create an Account\n\n    </button>\n\n  </form>\n\n</ion-content>\n\n\n\n\n\n<ion-footer>\n\n  <ion-navbar color="primary" >\n\n    <ion-title>Copyright 2018 <small>Version 1.0</small></ion-title>\n\n  </ion-navbar>\n\n</ion-footer>'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_data__["a" /* AuthData */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], Signup);
    return Signup;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 158:
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
webpackEmptyAsyncContext.id = 158;

/***/ }),

/***/ 199:
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
webpackAsyncContext.id = 199;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 281:
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

/***/ 282:
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

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_admin_admin__ = __webpack_require__(110);
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

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(307);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_reset_password_reset_password__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_admin_admin__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_index_index__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_auth_data__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_device__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* Login */],
                __WEBPACK_IMPORTED_MODULE_8__pages_reset_password_reset_password__["a" /* ResetPassword */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* Signup */],
                __WEBPACK_IMPORTED_MODULE_10__pages_admin_admin__["a" /* AdminPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_index_index__["a" /* IndexPage */]
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
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* Login */],
                __WEBPACK_IMPORTED_MODULE_8__pages_reset_password_reset_password__["a" /* ResetPassword */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* Signup */],
                __WEBPACK_IMPORTED_MODULE_12__pages_index_index__["a" /* IndexPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_admin_admin__["a" /* AdminPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_15__providers_auth_data__["a" /* AuthData */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
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

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { TabsPage } from '../pages/tabs/tabs';


//import { AdminPage } from '../pages/admin/admin'



var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, geolocation, device) {
        var _this = this;
        this.geolocation = geolocation;
        this.device = device;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* Login */];
        // Initialize Firebase  
        var config = {
            apiKey: 'AIzaSyCcc2Hxk2AGI9fLF6y7QC1yxF7UqTjy9gM',
            authDomain: "geotracker-a4855.firebaseapp.com",
            databaseURL: "https://geotracker-a4855.firebaseio.com",
            projectId: "geotracker-a4855",
            storageBucket: "geotracker-a4855.appspot.com",
            messagingSenderId: "766037115636"
        };
        __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.initializeApp(config);
        __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.auth().onAuthStateChanged(function (user) {
            if (!user) {
                console.log("not login");
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* Login */];
            }
            else {
                console.log("login");
                var database = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.database();
                var ref = database.ref('userProfile');
                ref.on("value", function (data) {
                    var tempdata = data.val();
                    var keys = Object.keys(tempdata);
                    //console.log(keys);
                    keys.forEach(function (element) {
                        if (tempdata[element].mobileNo == element) {
                            localStorage.setItem('mobId', tempdata[element].mobileNo);
                            return false;
                        }
                    });
                }, function (error) {
                    console.log("Error: " + error.code);
                });
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
            }
        });
        ////update location
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (data) {
            _this.updateGeolocation(_this.device.uuid, data.coords.latitude, data.coords.longitude);
        });
        ////////
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            // firebase.initializeApp(config);
        });
    }
    MyApp.prototype.updateGeolocation = function (uuid, lat, lng) {
        // console.log(localStorage.getItem('mykey'));
        var userId = localStorage.getItem('mobId');
        // let pass = 1234;
        if (userId) {
            __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.database().ref('geolocations/' + userId).set({
                uuid: uuid,
                latitude: lat,
                longitude: lng,
                time: new Date().getTime()
            });
        }
        else {
            console.log('not found');
            var database = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.database();
            var ref = database.ref('geolocations/' + userId);
            var newData = ref.push();
            newData.set({
                uuid: uuid,
                latitude: lat,
                longitude: lng,
                time: new Date().getTime()
            });
            // localStorage.setItem('mykey',userId)
        }
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__["a" /* Device */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(282);
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

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(114);
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
        localStorage.clear();
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_data__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_admin__ = __webpack_require__(110);
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
            selector: 'page-home',template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>Live Tracker</ion-title>\n\n  </ion-navbar>\n\n  \n\n  <button ion-button small color="danger" (click)="logOut()" float-right><ion-icon name="power"></ion-icon>\n\n  </button>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <br />\n\n  <br /><br />\n\n  <button ion-button color="primary" (click) = "gotToAdmin()">Track Location</button>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__providers_auth_data__["a" /* AuthData */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validators_email__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_data__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reset_password_reset_password__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__signup_signup__ = __webpack_require__(149);
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
            selector: 'page-login',template:/*ion-inline-start:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\login\login.html"*/'\n\n<ion-header>\n\n  <ion-navbar color="primary" >\n\n    <ion-title>LOGIN</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content id="login" >\n\n  <form [formGroup]="loginForm" (submit)="loginUser()" novalidate>\n\n    <!--divs-->\n\n    <div class="row responsive-md">\n\n      <div class="col col-50 col-offset-25">\n\n        <ion-item>\n\n          <ion-label stacked>Email</ion-label>\n\n          <ion-input #email formControlName="email" type="email" placeholder="Your email address" \n\n        [class.invalid]="!loginForm.controls.email.valid && loginForm.controls.email.dirty"></ion-input>\n\n        </ion-item>\n\n        <ion-item class="error-message" \n\n      *ngIf="!loginForm.controls.email.valid  && loginForm.controls.email.dirty">\n\n        <p>Please enter a valid email.</p>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label stacked>Password</ion-label>\n\n            <ion-input #password formControlName="password" type="password" placeholder="Your password" \n\n        [class.invalid]="!loginForm.controls.password.valid && loginForm.controls.password.dirty"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="error-message" \n\n      *ngIf="!loginForm.controls.password.valid  && loginForm.controls.password.dirty">\n\n          <p>Your password needs more than 6 characters.</p>\n\n          </ion-item>\n\n        <button ion-button block type="submit">\n\n          LOGIN\n\n        </button>\n\n        <button ion-button block clear (click)="goToSignup()">\n\n          Create a new account\n\n        </button>\n\n        <button ion-button block clear (click)="goToResetPassword()">\n\n          I forgot my password\n\n        </button>\n\n      </div>\n\n    </div>\n\n  </form>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <ion-navbar color="primary" >\n\n    <ion-title>Copyright 2018 <small>  |  Version 1.0</small></ion-title>\n\n  </ion-navbar>\n\n</ion-footer>'/*ion-inline-end:"D:\SANJAYAPP\PROJECT\ionic4Map\SANJAY\Ionic\auth\auth\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_data__["a" /* AuthData */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], Login);
    return Login;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[284]);
//# sourceMappingURL=main.js.map