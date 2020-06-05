import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTime'
})
export class ToTimePipe implements PipeTransform {

  transform(value: number): string {
    let minutes = Math.floor(value / 60);
    let seconds = value % 60;
    return `${minutes}:${this.pad(seconds)}`;
  }

  private pad (n: number): string {
    return (n < 10? `0${n}`: `${n}`);
  }
}
