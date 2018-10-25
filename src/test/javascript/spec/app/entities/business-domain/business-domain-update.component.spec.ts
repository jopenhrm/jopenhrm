/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JopenhrmTestModule } from '../../../test.module';
import { BusinessDomainUpdateComponent } from 'app/entities/business-domain/business-domain-update.component';
import { BusinessDomainService } from 'app/entities/business-domain/business-domain.service';
import { BusinessDomain } from 'app/shared/model/business-domain.model';

describe('Component Tests', () => {
    describe('BusinessDomain Management Update Component', () => {
        let comp: BusinessDomainUpdateComponent;
        let fixture: ComponentFixture<BusinessDomainUpdateComponent>;
        let service: BusinessDomainService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JopenhrmTestModule],
                declarations: [BusinessDomainUpdateComponent]
            })
                .overrideTemplate(BusinessDomainUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BusinessDomainUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusinessDomainService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BusinessDomain(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.businessDomain = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BusinessDomain();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.businessDomain = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
