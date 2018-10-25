import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from './company.service';
import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from 'app/entities/address';

@Component({
    selector: 'jhi-company-update',
    templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent implements OnInit {
    private _company: ICompany;
    isSaving: boolean;

    primaryaddresses: IAddress[];
    createdDate: string;
    updateDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private companyService: CompanyService,
        private addressService: AddressService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
        this.addressService.query({ filter: 'company-is-null' }).subscribe(
            (res: HttpResponse<IAddress[]>) => {
                if (!this.company.primaryAddress || !this.company.primaryAddress.id) {
                    this.primaryaddresses = res.body;
                } else {
                    this.addressService.find(this.company.primaryAddress.id).subscribe(
                        (subRes: HttpResponse<IAddress>) => {
                            this.primaryaddresses = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        this.router.navigate(['/company']);
    }

    save() {
        this.isSaving = true;
        this.company.createdDate = moment(this.createdDate, DATE_TIME_FORMAT);
        this.company.updateDate = moment(this.updateDate, DATE_TIME_FORMAT);
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(this.companyService.create(this.company));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompany>>) {
        result.subscribe((res: HttpResponse<ICompany>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAddressById(index: number, item: IAddress) {
        return item.id;
    }
    get company() {
        return this._company;
    }

    set company(company: ICompany) {
        this._company = company;
        this.createdDate = moment(company.createdDate).format(DATE_TIME_FORMAT);
        this.updateDate = moment(company.updateDate).format(DATE_TIME_FORMAT);
    }
}
