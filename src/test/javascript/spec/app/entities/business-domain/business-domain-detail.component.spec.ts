/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JopenhrmTestModule } from '../../../test.module';
import { BusinessDomainDetailComponent } from 'app/entities/business-domain/business-domain-detail.component';
import { BusinessDomain } from 'app/shared/model/business-domain.model';

describe('Component Tests', () => {
    describe('BusinessDomain Management Detail Component', () => {
        let comp: BusinessDomainDetailComponent;
        let fixture: ComponentFixture<BusinessDomainDetailComponent>;
        const route = ({ data: of({ businessDomain: new BusinessDomain(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JopenhrmTestModule],
                declarations: [BusinessDomainDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BusinessDomainDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BusinessDomainDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.businessDomain).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
