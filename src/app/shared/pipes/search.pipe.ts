import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], field: string, text: string): any[] {
    if (!items) { return []; }
    if (!field || !text) { return items; }

    return items.filter(it => {
      it[field].toLowerCase().includes(text.toLowerCase());
    });
  }

}
