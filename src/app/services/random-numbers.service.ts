import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumbersService {
  public getRandomNumber(min: number, max: number): number {
    return Math.floor(min + (max - min + 1) * Math.random());
  }
}
