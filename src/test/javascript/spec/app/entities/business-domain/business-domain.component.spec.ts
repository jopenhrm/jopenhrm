/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JopenhrmTestModule } from '../../../test.module';
import { BusinessDomainComponent } from 'app/entities/business-domain/business-domain.component';
import { BusinessDomainService } from 'app/entities/business-domain/business-domain.service';
import { BusinessDomain } from 'app/shared/model/business-domain.model';

describe('Component Tests', () => {
    describe('BusinessDomain Management Component', () => {
        let comp: BusinessDomainComponent;
        let fixture: ComponentFixture<BusinessDomainComponent>;
        let service: BusinessDomainService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JopenhrmTestModule],
                declarations: [BusinessDomainComponent],
                providers: []
            })
                .overrideTemplate(BusinessDomainComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BusinessDomainComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusinessDomainService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BusinessDomain(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.businessDomains[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
