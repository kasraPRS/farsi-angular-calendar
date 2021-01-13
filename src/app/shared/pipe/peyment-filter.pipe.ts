import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peymentFilter'
})
export class PeymentFilterPipe implements PipeTransform {

  transform(items: any[], filter: any[]): any {
    return items.filter(k => k.en === filter)
  }

}
