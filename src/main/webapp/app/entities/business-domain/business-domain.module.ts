import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JopenhrmSharedModule } from 'app/shared';
import {
    BusinessDomainComponent,
    BusinessDomainDetailComponent,
    BusinessDomainUpdateComponent,
    BusinessDomainDeletePopupComponent,
    BusinessDomainDeleteDialogComponent,
    businessDomainRoute,
    businessDomainPopupRoute
} from './';

const ENTITY_STATES = [...businessDomainRoute, ...businessDomainPopupRoute];

@NgModule({
    imports: [JopenhrmSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BusinessDomainComponent,
        BusinessDomainDetailComponent,
        BusinessDomainUpdateComponent,
        BusinessDomainDeleteDialogComponent,
        BusinessDomainDeletePopupComponent
    ],
    entryComponents: [
        BusinessDomainComponent,
        BusinessDomainUpdateComponent,
        BusinessDomainDeleteDialogComponent,
        BusinessDomainDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JopenhrmBusinessDomainModule {}
