import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { ConfigData } from '../models/configdata.model';


@Injectable()
export class CommonService {

  configdata: ConfigData;
  IsInialized = false;

  constructor(
    private http: HttpClient
           ) {
                http.get('/assets/config.json', {responseType: 'json'})
                .subscribe((data) => {
                                        this.configdata = <ConfigData>data;
                                        console.log(this.configdata);
                                        this.IsInialized = true;
                                      },
                                        err => console.log(err),
                                        () => console.log('config done')
                          );
              }

  SaveConfigData(data: ConfigData) {
    this.configdata = data;
  }

  getInitialized() {
    return this.IsInialized;
  }
  getTitle(): string {
    return this.configdata.title;
  }

  getUrl(): URL {
    return new URL(this.configdata.url);
  }

  getUsername(): string {
    return this.configdata.username;
  }

  getPassword(): string {
    return this.configdata.password;
  }

  setUrl(url: string) {
    this.configdata.url = url;
  }

  getBWUrl(server: string, port: string): URL {
    return (new URL('http://' + server + ':' + port));
  }

  setUsername(username: string) {
    this.configdata.username = username;
  }

  setPassword(password: string) {
    this.configdata.password = password;
  }

  getInternalServername(): string {
    return this.configdata.internalservername;
  }

  setInternalServername(name: string) {
    this.configdata.internalservername = name;
  }
  getInternalServerPort(): string {
    return this.configdata.internalserverport;
  }

  setInternalServerPort(port: string) {
    this.configdata.internalserverport = port;
  }

  getInternalUrl() {
    return ('http://' + this.configdata.internalservername + ':' + this.configdata.internalserverport);
  }


}

