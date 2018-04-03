import { Permission } from './bw-permission.model';

export class FieldDefinition {
    constructor (
            public resourceType: string,
            public version: string,
            public lastUpdateTime: string,
            public lastChangedBy: string,
            public owner: string,
            public name: string,
            public tags: string,
            public description: string,
            public overlayGroupId: string,
            public developerId: string,
            public id: number,
            public fieldOption: string,
            public permission: Permission[],
            public fieldTypeName: string,
            public isInherited: boolean,
            public explicitPermissions: Permission[],
            public overlayDescriptor: string ,
            public fieldMapping: string ,
            public allowPermissionsOverlay: boolean,
            public allowOtherPropertiesOverlay: boolean,
            public auditOption: string,
            public maxLength: number,
            public defaultValue: string,
            public searchDefinition: string ,
            public namedListDefinition: string ,
            public shouldPersistEncrypted: boolean,
            public associationGuid: string ,
            public anyUserAllowedToSubmit: boolean
    ) {}
}





