import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BackendDatastoreService } from '../services/backend-datastore.service';
import { CommonService } from '../services/common.service';
import { OperationalCompany } from '../models/bw-OperationalCompany.model';
import { DataPage } from '../models/bw-datapage.model';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  isCollapsed1 = false;
  isCollapsed2 = false;
  isCollapsed3 = true;
  isCollapsed4 = false;

  internal_valid = false;
  bw_valid = false;
  dw_valid = false;

  internalservername = '';
  internalserverport = '';

  bwpath;
  bwadminuser = '';
  bwadminpwd = '';

  companies: Object[] = [];
  companynames: string[][];

  constructor(
    private backend: BackendDatastoreService,
    private common: CommonService
  ) { }

  ngOnInit() {
    console.log('Config');
    this.internalservername = this.common.getInternalServername();
    this.internalserverport = this.common.getInternalServerPort();
    this.bwpath = this.common.getUrl();
    this.bwadminuser = this.common.getUsername();
    this.bwadminpwd = this.common.getPassword();

  }

  onCollapseClick(collapseId: number) {
    this.isCollapsed1 = false;
    this.isCollapsed2 = false;
    this.isCollapsed3 = false;
    this.isCollapsed4 = false;
    switch (collapseId) {
      case 1: this.isCollapsed1 = true;
              break;
      case 2: this.isCollapsed2 = true;
              break;
      case 3: this.isCollapsed3 = true;
              break;
      case 4: this.isCollapsed4 = true;
              break;
    }
  }

  onInternalClicked(configForm: NgForm) {
    this.internalservername = configForm.controls['int-servername'].value;
    this.internalserverport = configForm.controls['int-serverport'].value.toString();

    this.backend.getVersion(this.internalservername, this.internalserverport)
      .subscribe(
        (response) => {
          this.internal_valid = true;
          this.common.setInternalServername(this.internalservername);
          this.common.setInternalServerPort(this.internalserverport);
          this.onCollapseClick(1);
        },
        (error) => {
          this.internal_valid = false;
        }
      );
  }

  onBWClicked(configForm: NgForm) {
    this.bwpath = new URL(configForm.controls['bwurl'].value);
    this.bwadminuser = configForm.controls['bw-adminuser'].value;
    this.bwadminpwd = configForm.controls['bw-adminpwd'].value;

    this.backend.getToken(this.bwpath, this.bwadminuser, this.bwadminpwd)
      .subscribe(
        (response) => {
          this.bw_valid = true;
          this.common.setUrl(this.bwpath);
          this.common.setUsername(this.bwadminuser);
          this.common.setPassword(this.bwadminpwd);
          this.backend.getData(
                                'com.bmc.arsys.rx.application.namedlist.datapage.NamedListDataPageQuery',
                                'com.bmc.dsm.ticketing-lib:Operating Companies',
                                '-1',
                                '0'
              ).subscribe(
                (result: DataPage) => {
                  this.companies = result.data.slice();
                  this.companynames = this.companies.map(c => Object.keys(c));
                  console.log(this.companies);
                  console.log(this.companynames);
                },
                (error) => {
                  console.log(error);
                });
          this.onCollapseClick(2);
        },
        (error) => {
          this.internal_valid = false;
        }
      );
  }

}
