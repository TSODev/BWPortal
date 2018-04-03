/*

{
  "id": "AGGADG1AANVNMAPGD57VPFGTH5TUPF",
  "displayId": "CASE-0000000710",
  "status": 2000,
  "summary": "Test",
  "createdBy": "Hannah",
  "createdDate": "2018-03-24T11:49:07.000Z",
  "modifiedBy": "Hannah",
  "modifiedDate": "2018-03-24T11:49:07.000Z",
  "assignee": null,
  "description": "thierry.soulie@gmail.com has created the case from the web portal",
  "priority": 2000,
  "requester": "WebAccess",
  "contact": null,
  "company": "AG005056AC2B58tgEgTQRvVoBwQzAD",
  "categoryTier1": "AGGADG1AANVNNAPFU533PEXT40ASF1",
  "categoryTier2": "AGGADG1AANVNNAPFU5YIPEXTZFAX6W",
  "categoryTier3": null,
  "assignedGroup": "AGGADG1AANVNNAPFU5IJPEXTJGARCG",
  "notify": 1000,
  "origin": "Web Site",
  "statusReason": null,
  "questions": [
  ]
}

*/

export class Case {
  constructor(
    public id: string,
    public displayId: string,
    public status: number,
    public summary: string,
    public createdBy: string,
    public createdDate: string,
    public modifiedBy: string,
    public modifiedDate: string,
    public assignee: string,
    public description: string,
    public priority: number,
    public requester: string,
    public contact: string,
    public company: string,
    public categoryTier1: string,
    public categoryTier2: string,
    public categoryTier3: string,
    public assignedGroup: string,
    public notify: number,
    public origin: string,
    public statusReason: string,
    public questions: string[]
  ) {}
}
