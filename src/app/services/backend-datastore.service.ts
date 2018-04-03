import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Case } from '../models/case.model';
import { RecordInstance } from '../models/bw-recordInstance.model';
import { CommonService } from './common.service';
import { DataPage } from '../models/bw-datapage.model';



@Injectable()
export class BackendDatastoreService {

  constructor(private http: HttpClient, private common: CommonService) { }

  getVersion(servername: string, port: string): Observable<string> {
    return this.http.get( 'http://' + servername + ':' + port + '/api/version', { responseType: 'text' });
  }


  getToken(urlbase: URL, username: string, password: string): Observable<string> {
    const protocol = urlbase.protocol;
    const port = urlbase.port;
    const server = urlbase.hostname;

    return this.http.post(this.common.getInternalUrl() + '/api/config', {
                                                                    protocol,
                                                                    port,
                                                                    server,
                                                                    adminuser: username,
                                                                    adminpwd: password
                                                                    } , {
//                                                                              withCredentials: true,
                                                                              responseType: 'text'
                                                                          });
  }

  postCase(body: Object): Observable<Case> {
    const inturl = 'http://' + this.common.getInternalServername() + ':' + this.common.getInternalServerPort();
    return this.http.post(this.common.getInternalUrl() + '/api/case',
      body,
      {
        reportProgress: true,
        responseType: 'json'
      })
      .map(data => <Case>data);
    // .catch((error: any) => Observable.throw('Server Error'));
   }


  genericPost(body: Object): Observable<RecordInstance> {
    return this.http.post(this.common.getInternalUrl() + '/api/recordInstance/',
      body,
    {
      reportProgress: true,
      responseType: 'json'
    })
    .map(data => <RecordInstance>data);
  }

  getData(datapageType: string, namedlistdefinition: string, pageSize: string, startIndex: string): Observable<DataPage> {
    return this.http.get(this.common.getInternalUrl() + '/api/datapage'
                + '?datapageType=' + datapageType
                + '&namedlistdefinition=' + namedlistdefinition
                + '&pageSize=' + pageSize
                + '&startIndex=' + startIndex,
  {
    reportProgress: true,
    responseType: 'json'
  })
  .map(data => <DataPage>data);
  }
}



