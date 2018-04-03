import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
//import 'rxjs/add/operator/do';

@Injectable()
export class MenuService {
  private _urlMenu = 'api/seguridad/menu';

  constructor(private _http: HttpClient) { }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
  }

  getMenu(parameters): Observable<any[]> {
    let Params = new HttpParams();
    Params = Params.append('roleId', parameters.rolId);

    return this._http.get(this._urlMenu, { params: Params })
       //.do(data => console.log('Menu:' + JSON.stringify(data)))
      .catch(this.handleError);
  }
}
