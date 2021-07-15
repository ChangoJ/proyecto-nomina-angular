import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultPosts = [];
    for (const employee of value) {
      if (employee.ci.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(employee);
      };
    };
    return resultPosts;
  }
}
