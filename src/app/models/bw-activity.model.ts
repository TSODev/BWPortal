
export class BWActivity {
    constructor(
        public activityId: string,
        public startTime: string,
        public endTime: string,
        public activities: BWActivity[],
        public executionId: string,
    ) {}
}
