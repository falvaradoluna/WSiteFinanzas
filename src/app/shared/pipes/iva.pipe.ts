import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iva'
})
export class IvaPipe implements PipeTransform {

  transform(value: string, isan: string): string {
    console.log(value);
    const pb = Number(value) || 0;
    const isn = Number(isan) || 0;

    return ((pb + isn) * 0.16).toString();
  }

}
