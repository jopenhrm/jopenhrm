import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JopenhrmCompanyModule } from './company/company.module';
import { JopenhrmBusinessDomainModule } from './business-domain/business-domain.module';
import { JopenhrmAddressModule } from './address/address.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JopenhrmCompanyModule,
        JopenhrmBusinessDomainModule,
        JopenhrmAddressModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JopenhrmEntityModule {}
