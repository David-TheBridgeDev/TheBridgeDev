import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export enum DeviceState {
  NORMAL,
  STEP,
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  deviceState = new BehaviorSubject<DeviceState>(DeviceState.NORMAL);

  constructor() {}
}
