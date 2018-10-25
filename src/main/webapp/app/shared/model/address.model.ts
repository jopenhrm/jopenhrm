export interface IAddress {
    id?: number;
    street?: string;
    state?: string;
    city?: string;
    country?: string;
}

export class Address implements IAddress {
    constructor(public id?: number, public street?: string, public state?: string, public city?: string, public country?: string) {}
}
