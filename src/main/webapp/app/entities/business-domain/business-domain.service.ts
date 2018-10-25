import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBusinessDomain } from 'app/shared/model/business-domain.model';

type EntityResponseType = HttpResponse<IBusinessDomain>;
type EntityArrayResponseType = HttpResponse<IBusinessDomain[]>;

@Injectable({ providedIn: 'root' })
export class BusinessDomainService {
    private resourceUrl = SERVER_API_URL + 'api/business-domains';

    constructor(private http: HttpClient) {}

    create(businessDomain: IBusinessDomain): Observable<EntityResponseType> {
        return this.http.post<IBusinessDomain>(this.resourceUrl, businessDomain, { observe: 'response' });
    }

    update(businessDomain: IBusinessDomain): Observable<EntityResponseType> {
        return this.http.put<IBusinessDomain>(this.resourceUrl, businessDomain, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBusinessDomain>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBusinessDomain[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
