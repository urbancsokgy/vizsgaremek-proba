import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../model/author';

@Pipe({
  name: 'authorName'
})
export class AuthorNamePipe implements PipeTransform {

  transform(value: Author|null|undefined, withBornDate?: boolean): string {
    if (!value) {
      return 'unknown';
    }

    const result = `${value.firstName} ${value.lastName}`;

    return withBornDate && value.born ? `${result} (${value.born})` : result;
  }

}
