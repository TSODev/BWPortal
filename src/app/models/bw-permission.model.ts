export class Permission {
    constructor (
        public ownerId: {
            value: number,
            type: string,
            name: string
        },
        public type: string
    ) {}
}
