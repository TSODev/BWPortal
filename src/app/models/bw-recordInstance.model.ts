import { FieldInstance } from './bw-fieldInstance.model';

export class RecordInstance {
    constructor (
public resourceType: string,
public id: string,
public displayId: string,
public recordDefinitionName: string,
public permittedGroupsBySecurityLabels: {},
public permittedUsersBySecurityLabels: {},
public permittedRolesBySecurityLabels: {},
public fieldInstances: {
    id: number,
    value: FieldInstance
}
    ) {}
}

