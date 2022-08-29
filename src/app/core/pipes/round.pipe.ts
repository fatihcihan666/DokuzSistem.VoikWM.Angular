import { Pipe, PipeTransform } from '@angular/core';

// value yuvarlanacak sayıyı temsil eder
// digit sağdan kaç basamak yuvarlanacağını temsil eder
@Pipe({ name: 'round' })
export class RoundPipe implements PipeTransform {
    transform(value: number, digit: number): number {
        return Math.round(value * Math.pow(10, digit)) / Math.pow(10, digit);
    }
}
