import { Injectable } from '@angular/core';
import { get } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public readonly backendUrl: string = 'http://127.0.0.1:3000';
  public readonly apiUrl: string = `${this.backendUrl}/api`;

  constructor() { }

  static activeOrInactiveSign(v: boolean): string {
    const icon: string = v ? 'fa-check' : 'fa-ban';
    return `<i class="fas ${icon}"></i>`;
  }

  // row.customer.name => (row, 'customer.name')
  static getSubProperty(obj: any, ...keys: string[]): string | number | boolean | undefined {
    return keys.map( key => get(obj, key) ).join(' ');
  }

  static sqlDate(jsTime: number): string | number | boolean | undefined {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return Intl.DateTimeFormat('hu', options).format(jsTime);
  }

  static curveLongString(
    data: string,
    start: number,
    end: number,
    curve: string = '...'
  ): string {
    return data.slice(start, end) + curve;
  }

}
