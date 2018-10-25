import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBusinessDomain } from 'app/shared/model/business-domain.model';
import { BusinessDomainService } from './business-domain.service';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company';

@Component({
    selector: 'jhi-business-domain-update',
    templateUrl: './business-domain-update.component.html'
})
export class BusinessDomainUpdateComponent implements OnInit {
    private _businessDomain: IBusinessDomain;
    isSaving: boolean;

    companies: ICompany[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private businessDomainService: BusinessDomainService,
        private companyService: CompanyService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ businessDomain }) => {
            this.businessDomain = businessDomain;
        });
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompany[]>) => {
                this.companies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.businessDomain.id !== undefined) {
            this.subscribeToSaveResponse(this.businessDomainService.update(this.businessDomain));
        } else {
            this.subscribeToSaveResponse(this.businessDomainService.create(this.businessDomain));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBusinessDomain>>) {
        result.subscribe((res: HttpResponse<IBusinessDomain>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCompanyById(index: number, item: ICompany) {
        return item.id;
    }
    get businessDomain() {
        return this._businessDomain;
    }

    set businessDomain(businessDomain: IBusinessDomain) {
        this._businessDomain = businessDomain;
    }
}
