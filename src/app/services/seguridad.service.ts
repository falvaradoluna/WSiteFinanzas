import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IMenu } from '../models/security/menu';

@Injectable()
export class SeguridadService {
  private _urlMenu = 'api/seguridad/menu';

  constructor(private _http: HttpClient) { }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
  }

  getMenu(parameters): Observable<IMenu[]> {
    let Params = new HttpParams();
    Params = Params.append('roleId', parameters.rolId);

    return this._http.get<IMenu[]>(this._urlMenu, { params: Params })
      .catch(this.handleError);
  }
}
