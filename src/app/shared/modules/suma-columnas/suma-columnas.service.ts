import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SumaColumnasService {

  constructor() { }

  private sumaSource = new Subject<number>();
  suma$ = this.sumaSource.asObservable();

  add(value: number) {
    this.sumaSource.next(value);
  }
}
