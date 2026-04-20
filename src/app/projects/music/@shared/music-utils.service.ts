import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MusicUtilsService {
  constructor() {}

  rotate2DArray<T>(matrix: T[][], n: number): T[][] {
    const len = matrix.length;
    // Normalizamos n para que sea siempre entre 0 y len-1
    const shift = ((n % len) + len) % len;

    let result = matrix.map((_, i) => matrix[(i + shift) % len]);

    // anade el traste 12
    result.push(result[0]);

    return result;
  }
}
