import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatecurrency'
})
export class FormatecurrencyPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
      if (value) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(value));
    }else {
      return value
    }
  }

}
