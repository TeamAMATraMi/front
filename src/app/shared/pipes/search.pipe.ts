import { Pipe, PipeTransform } from '@angular/core';
import {Apprenant} from '../interfaces/apprenant';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Apprenant[], field: string[], text: string): Apprenant[] {
    if (!items) { return []; }
    if (!field || !text) { return items; }

    let res: Apprenant[];
    res = [];

    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < field.length; j++) {
        if (items[i][field[j]].toLowerCase().includes(text.toLowerCase())) {
          res.push(items[i]);
          break;
        }
      }
    }

    return res;
  }

}
