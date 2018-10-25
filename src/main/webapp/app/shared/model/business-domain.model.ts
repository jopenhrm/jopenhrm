import { ICompany } from 'app/shared/model//company.model';

export interface IBusinessDomain {
    id?: number;
    name?: string;
    company?: ICompany;
}

export class BusinessDomain implements IBusinessDomain {
    constructor(public id?: number, public name?: string, public company?: ICompany) {}
}
