import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBusinessDomain } from 'app/shared/model/business-domain.model';
import { Principal } from 'app/core';
import { BusinessDomainService } from './business-domain.service';

@Component({
    selector: 'jhi-business-domain',
    templateUrl: './business-domain.component.html'
})
export class BusinessDomainComponent implements OnInit, OnDestroy {
    businessDomains: IBusinessDomain[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private businessDomainService: BusinessDomainService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.businessDomainService.query().subscribe(
            (res: HttpResponse<IBusinessDomain[]>) => {
                this.businessDomains = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBusinessDomains();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBusinessDomain) {
        return item.id;
    }

    registerChangeInBusinessDomains() {
        this.eventSubscriber = this.eventManager.subscribe('businessDomainListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
