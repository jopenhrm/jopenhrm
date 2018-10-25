import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusinessDomain } from 'app/shared/model/business-domain.model';
import { BusinessDomainService } from './business-domain.service';
import { BusinessDomainComponent } from './business-domain.component';
import { BusinessDomainDetailComponent } from './business-domain-detail.component';
import { BusinessDomainUpdateComponent } from './business-domain-update.component';
import { BusinessDomainDeletePopupComponent } from './business-domain-delete-dialog.component';
import { IBusinessDomain } from 'app/shared/model/business-domain.model';

@Injectable({ providedIn: 'root' })
export class BusinessDomainResolve implements Resolve<IBusinessDomain> {
    constructor(private service: BusinessDomainService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((businessDomain: HttpResponse<BusinessDomain>) => businessDomain.body));
        }
        return of(new BusinessDomain());
    }
}

export const businessDomainRoute: Routes = [
    {
        path: 'business-domain',
        component: BusinessDomainComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jopenhrmApp.businessDomain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'business-domain/:id/view',
        component: BusinessDomainDetailComponent,
        resolve: {
            businessDomain: BusinessDomainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jopenhrmApp.businessDomain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'business-domain/new',
        component: BusinessDomainUpdateComponent,
        resolve: {
            businessDomain: BusinessDomainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jopenhrmApp.businessDomain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'business-domain/:id/edit',
        component: BusinessDomainUpdateComponent,
        resolve: {
            businessDomain: BusinessDomainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jopenhrmApp.businessDomain.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const businessDomainPopupRoute: Routes = [
    {
        path: 'business-domain/:id/delete',
        component: BusinessDomainDeletePopupComponent,
        resolve: {
            businessDomain: BusinessDomainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jopenhrmApp.businessDomain.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
