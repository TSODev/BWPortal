import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BackendDatastoreService } from './../services/backend-datastore.service';
import { CommonService } from './../services/common.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
// import { DecimalPipe } from '@angular/common';

import 'rxjs/add/observable/interval';
import * as moment from 'moment';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  @ViewChild('configModal') configModal: ModalDirective;

  token = '';
//  showmodal = false;
  sub: Subscription;
  nbday = 0;
  nbhour = 0;
  nbminute = 0;
  nbsecond = 0;
  dt: moment.Moment;

  url: URL;
  userrname: string;
  password: string;


  constructor(
        private backend: BackendDatastoreService,
        private common: CommonService,
        private router: Router) { }

  ngOnInit() {
    console.log('Init');
    this.sub = Observable.interval(1000)          // This is a 1 second period loop
      .subscribe((val) => {
        this.dt = moment();
        const enforceOn = moment('2018-05-25');
        this.nbday = enforceOn.diff(this.dt, 'days');
//        this.dt.subtract(this.nbday, 'days');
        this.nbhour = enforceOn.diff(this.dt, 'hours') % 24;
//        this.dt.subtract(this.nbhour, 'hours');
        this.nbminute = enforceOn.diff(this.dt, 'minutes') % 60;
//        this.dt.subtract(this.nbminute, 'minutes');
        this.nbsecond = enforceOn.diff(this.dt, 'second') % 60;
//        console.log('Now : ', this.dt.toString());
       });
  }

onConfig() {
    this.router.navigate(['/config']);
  }

  saveConfig(configForm: NgForm) {
    console.log('Saving Configuration');
    console.log(configForm);
    console.log('url : ', configForm.controls['bwurl'].value);
    console.log('username : ', configForm.controls['username'].value);
    console.log('password : ', configForm.controls['password'].value);
    console.log('internal : ', configForm.controls['internalurl'].value);
    this.configModal.hide();
  }
}
