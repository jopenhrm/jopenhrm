import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBusinessDomain } from 'app/shared/model/business-domain.model';
import { BusinessDomainService } from './business-domain.service';

@Component({
    selector: 'jhi-business-domain-delete-dialog',
    templateUrl: './business-domain-delete-dialog.component.html'
})
export class BusinessDomainDeleteDialogComponent {
    businessDomain: IBusinessDomain;

    constructor(
        private businessDomainService: BusinessDomainService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.businessDomainService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'businessDomainListModification',
                content: 'Deleted an businessDomain'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-business-domain-delete-popup',
    template: ''
})
export class BusinessDomainDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ businessDomain }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BusinessDomainDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.businessDomain = businessDomain;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
