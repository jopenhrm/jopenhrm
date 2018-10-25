import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBusinessDomain } from 'app/shared/model/business-domain.model';

@Component({
    selector: 'jhi-business-domain-detail',
    templateUrl: './business-domain-detail.component.html'
})
export class BusinessDomainDetailComponent implements OnInit {
    businessDomain: IBusinessDomain;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ businessDomain }) => {
            this.businessDomain = businessDomain;
        });
    }

    previousState() {
        window.history.back();
    }
}
