
export class ProcessVariable {
    constructor (
        public Status: string,
        public Origin: string,
        public Case ID: string,
        public Assignee: string,
        public Company: string,
        public Description: string,
        public Priority: string,
        public ServiceRequestID: string,
        public CaseTemplateID: string,
        public ProcessInstanceActivityResults: string,
        public EndUserEmail: string,
        public CategoryTier1: string,
        public Requester: string,
        public CategoryTier2: string,
        public CategoryTier3: string,
        public SupportGroup: string,
        public ServiceRequestDisplayID: string,
        public Summary: string,
        public StatusReason: string,
        public ProcessInstanceErrors: string,
    ){
    }
}
