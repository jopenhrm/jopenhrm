import { Moment } from 'moment';
import { IAddress } from 'app/shared/model//address.model';
import { IBusinessDomain } from 'app/shared/model//business-domain.model';

export const enum CompanySize {
    LESS_THAN_10 = 'LESS_THAN_10',
    MORE_THAN_10_LESS_THAN_50 = 'MORE_THAN_10_LESS_THAN_50',
    MORE_THAN_50_LESS_THAN_100 = 'MORE_THAN_50_LESS_THAN_100',
    MORE_THAN_100_LESS_THAN_500 = 'MORE_THAN_100_LESS_THAN_500',
    MORE_THAN_500 = 'MORE_THAN_500'
}

export interface ICompany {
    id?: number;
    name?: string;
    logo?: string;
    website?: string;
    fax?: string;
    phoneNumber?: string;
    companySize?: CompanySize;
    establishDate?: Moment;
    updateDate?: Moment;
    primaryAddress?: IAddress;
    businessDomains?: IBusinessDomain[];
}

export class Company implements ICompany {
    constructor(
        public id?: number,
        public name?: string,
        public logo?: string,
        public website?: string,
        public fax?: string,
        public phoneNumber?: string,
        public companySize?: CompanySize,
        public createdDate?: Moment,
        public updateDate?: Moment,
        public primaryAddress?: IAddress,
        public businessDomains?: IBusinessDomain[]
    ) {}
}
