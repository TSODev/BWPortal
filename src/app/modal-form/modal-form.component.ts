import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../services/common.service';
import { BackendDatastoreService } from '../services/backend-datastore.service';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';

import { Case } from '../models/case.model';
import { RecordInstance } from '../models/bw-recordInstance.model';
import { OperationalCompany } from '../models/bw-OperationalCompany.model';
import { CommandResult } from '../models/bw-commandresult.model';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  @ViewChild('caseModal') caseModal: ModalDirective;
  @Input() staticModal: ModalDirective;
  @Input() modalnum: number;

  categories = [];
  email = '';
  casedescription = '';
  token = '';
  category = 'GDPR - Rectification and Erasure';

  caseId = '';
  modalneedcategories = true;

  Case_Requester = {
                        name: 'WebAcess',
                        id: 'AGGADG1AANVNMAPGBLKGPFEZ82UDUJ'
                    };                          // WebAccess

  Case_CompanyId = 'AG005056AC2B58tgEgTQRvVoBwQzAD';                            // Petramco
  Case_CatTier1 = 'AGGADG1AANVNNAPFU533PEXT40ASF1';                             // GDPR

  constructor(
      private common: CommonService,
      private backend: BackendDatastoreService
    ) { }

  ngOnInit() {

//     this.backend.getToken(this.common.getUrl(), this.common.getUsername(), this.common.getPassword())
//     .subscribe(
//       (response: string) => {
//           this.backend.getData('com.bmc.arsys.rx.application.namedlist.datapage.NamedListDataPageQuery',
//                         'com.bmc.dsm.ticketing-lib:Operating+Companies',
//                         '-1',
//                         '1').subscribe(
//                             (result: OperationalCompany[]) => {
//                               console.log(result);
// //                              this.Case_CompanyId = result.find(oc => {oc.name === 'Petramco'}).Id;
//                             },
//                             (error) => {
//                               console.log(error);
//                             }
//                       );
// // Search Requester          this.backend.getData()
//                     },
//       (error: string) => {
//         console.log(error);
//       });

    if ( this.modalnum === 1 ) {
      this.modalneedcategories = false;
      this.categories = [
        'GDPR - Information and Access Data',
      ];
      this.category = 'GDPR - Information and Access Data';
    }
    if ( this.modalnum === 2 ) {
      this.modalneedcategories = true;
      this.categories = [
        'GDPR - Rectification and Erasure',                       // *
        'GDPR - Right to rectification',
        'GDPR - Right to erasure',
        'GDPR - Right to restriction of processing',              // *
        'GDPR - Right to data portability',                       // *
        'GDPR - Right to object'                                  // *
      ];
      this.category = 'GDPR - Rectification and Erasure';
    }
  }

  hideModal(): void {
    this.staticModal.hide();
  }

  CreateCase(modalForm: NgForm) {
    if (this.modalnum === 2) {
      this.category = modalForm.controls['category'].value;
    }
    this.backend.getToken(this.common.getUrl(), this.common.getUsername(), this.common.getPassword())
    .subscribe(
      (response: string) => {
        // this.token = response;
        // console.log(response);
        console.log('Category : ', this.category);
        this.backend.postCase(
          {
            Status: '2000',
            Company: 'Petramco',
            Description: this.email + ' has created the case from the web portal',
            Requester: 'WebAccess',
            Priority: '2000',
            'Category Tier 1': 'GDPR',
            'Category Tier 2': this.category,
            Summary: this.casedescription,
//            'Case Template ID': 'CTPL-0000000101',
            'Support Group': 'GDPR Support Group',
            'Origin': 'Web Site',
            'Service Request Display ID': '(external)',
            'Customer Num': this.email
          }
        ).subscribe(
          (result: Case) => {
            console.log('Case has been created : ', result);
            this.casedisplayId = result.displayId;
              this.staticModal.hide();
//              this.caseModal.show();
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }


  CreateCasebyInterface(modalForm: NgForm) {
    if (this.modalnum === 2) {
      this.category = modalForm.controls['category'].value;
    }
    this.backend.getToken(this.common.getUrl(), this.common.getUsername(), this.common.getPassword())
    .subscribe(
      (response: string) => {
        // this.token = response;
        // console.log(response);
        console.log('Category : ', this.category);
        this.backend.postCasebyInterface(
          {
            resourceType: 'com.bmc.arsys.rx.application.process.command.StartProcessInstanceCommand',
            // tslint:disable-next-line:max-line-length
            processDefinitionName: 'com.bmc.dsm.hrcm-lib:GDPR - Interface Create',                    // 'com.bmc.dsm-case-lib:GDPR - Interface Create',
            processInputValues: {
                Status: '2000',
                Company: 'Petramco',
                Description: this.casedescription,
                Requester: 'WebAccess',
                Priority: '2000',
                'Category Tier 1': 'GDPR',
                'Category Tier 2': this.category,
                Summary: this.casedescription,
  //            'Case Template ID': 'CTPL-0000000101',
                'Support Group': 'GDPR Support Group',
                'Origin': 'Web Site',
                'Service Request Display ID': '(external)',
                'EndUser Email': this.email
            }
          }

        ).subscribe(
          (result: CommandResult) => {
            console.log('Case has been created : ', result);
            this.caseId = result.processVariables.Case;
              this.staticModal.hide();
//              this.caseModal.show();
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }



GenericCreateCase (modalForm: NgForm) {
    console.log(modalForm);
    console.log(this.caseModal);
    if (this.modalnum === 2) {
      this.category = modalForm.controls['category'].value;
    }
    this.backend.getToken(this.common.getUrl(), this.common.getUsername(), this.common.getPassword())
    .subscribe(
      (response: string) => {
        // this.token = response;
        // console.log(response);
        console.log('Category : ', this.category);
        this.backend.genericPost(
          {
            'resourceType': 'com.bmc.arsys.rx.services.record.domain.RecordInstance',
            'id': null,
            'displayId': null,
            'recordDefinitionName': 'com.bmc.dsm.hrcm-lib:Case',
            'permittedGroupsBySecurityLabels': null,
            'permittedUsersBySecurityLabels': null,
            'permittedRolesBySecurityLabels': null,
            'fieldInstances': {
              '8': {                                                                            // Summary
                'resourceType': 'com.bmc.arsys.rx.services.record.domain.FieldInstance',
                'id': 8,
                'value': this.casedescription
              },
              '304411211': {                                                                    // Origin
                'resourceType': 'com.bmc.arsys.rx.services.record.domain.FieldInstance',
                'id': 304411211,
                'value': 'Web Site'
              },
              '536870913': {
                'resourceType': 'com.bmc.arsys.rx.services.record.domain.FieldInstance',
                'id': 536870913,
                'value': this.email
              },
              '1000000000': {
                'resourceType': 'com.bmc.arsys.rx.services.record.domain.FieldInstance',
                'id': 1000000000,
                'value': this.email + ' has created the case from the web portal'
              },
              '1000000001': {                                                                   // Company
                'resourceType': 'com.bmc.arsys.rx.services.record.domain.FieldInstance',
                'id': 1000000001,
                'value': this.Case_CompanyId
              },
              '1000000063': {                                                                   // Category Tier 1
                'resourceType': 'com.bmc.arsys.rx.services.record.domain.FieldInstance',
                'id': 1000000063,
                'value': this.Case_CatTier1
              },
              '1000000064': {                                                                   // Category Tier 2
                'resourceType': 'com.bmc.arsys.rx.services.record.domain.FieldInstance',
                'id': 1000000064,
                'value': this.category
              },
              '1000000217': {                                                                   // Assigned Group
                'resourceType': 'com.bmc.arsys.rx.services.record.domain.FieldInstance',
                'id': 1000000217,
                'value': 'GDPR Support Group'
              },
              '1000000337': {                                                                   // Requester
                'resourceType': 'com.bmc.arsys.rx.services.record.domain.FieldInstance',
                'id': 1000000337,
                'value': this.Case_Requester.id
              },
              '450000029': {                                                                   // Service Request Display ID
                'resourceType': 'com.bmc.arsys.rx.services.record.domain.FieldInstance',
                'id': 450000029,
                'value': '(external)'
              }
            }
          }
        ).subscribe(
          (result: RecordInstance) => {
            console.log('Case has been created : ', result);
            this.casedisplayId = result.displayId;
              this.staticModal.hide();
//              this.caseModal.show();
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
