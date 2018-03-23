import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FechaActualizacionService {

  constructor() { }

  private fechaActualizacionSource = new Subject<Date>();
  columnSorted$ = this.fechaActualizacionSource.asObservable();

  onChangeFecha(event: Date) {
    this.fechaActualizacionSource.next(event);
  }
}
