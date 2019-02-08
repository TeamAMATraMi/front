import { Pipe, PipeTransform } from '@angular/core';
import {Apprenant} from '../interfaces/apprenant';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Apprenant[], field: string, text: string): Apprenant[] {
    if (!items) { console.log('NO ITEMS '); return []; }
    if (!field || !text) { console.log('NO FIELD '); return items; }

    let res: Apprenant[];
    res = [];

    for (let i = 0; i < items.length; i++) {
      if (items[i][field].toLowerCase().includes(text.toLowerCase())) {
        res.push(items[i]);
      }
    }

    return res;
  }

}
