import { BaseEntity } from './../../shared';

export class Entry implements BaseEntity {
    constructor(
        public id?: number,
        public machine?: string,
        public category?: string,
        public directory?: string,
        public project?: string,
        public createDate?: any,
    ) {
    }
}
