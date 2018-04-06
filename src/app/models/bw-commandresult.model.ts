
import { ProcessVariable } from './bw-processvariable.model';
import { BWActivity } from './bw-activity.model';

export class CommandResult {
    constructor(
            public processDefinitionName: string,
            public processDefinitionId: string,
            public processDefinitionVersion: string,
            public processDefinitionOverlayGroup: string,
            public instanceId: string,
            public parentInstanceId: string,
            public contextId: string,
            public contextKey: string,
            public owner: string,
            public status: string,
            public startTime: string,
            public endTime: string,
            public exceptionMessage: string,
            public cancelReason: string,
            public processVariables: ProcessVariable,
            public activities: BWActivity[],
    ) {}
}
