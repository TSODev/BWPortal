import { DataRecord } from './is-datarecord.model';

export class ConfigData {

    constructor(
        public title: string,
        public categories: DataRecord[],
        public url: string,
        public username: string,
        public password: string,
        public internalservername: string,
        public internalserverport: string,
        public Case_Requester: DataRecord,
        public Case_CompanyId: DataRecord,
        public Case_CatTier1: DataRecord
                ) {}
}

