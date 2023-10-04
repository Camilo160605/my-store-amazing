import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceVocal'
})
export class ReplaceVocalPipe implements PipeTransform {

  transform(value: string): string {
    return value
    .replace(/(e)/g,"3")
    .replace(/(i)/g,"1")
    .replace(/(o)/g,"0")
    .replace(/(a)/g,"4");
  }

}
