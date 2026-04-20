import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ShellyActions } from '../models/shelly-actions';
import { DeviceState } from '../models/deviceState';

@Injectable({
  providedIn: 'root',
})
export class ShellyService {
  deviceState = new BehaviorSubject<DeviceState>(DeviceState.NORMAL);

  constructor(private http: HttpClient) {}

  controlRelayRPC(ip: string, action: ShellyActions) {
    let url = `http://${ip}/rpc/Switch.Set?id=0&on=${action}`;
    return this.http.get(url);
  }

  controlLight(ip: string, action: ShellyActions, brightness?: number) {
    let url = `http://${ip}/light/0?turn=${action}`;
    if (brightness !== undefined) {
      url += `&brightness=${brightness}`;
    }
    return this.http.get(url);
  }

  controlRoller(ip: string, action: ShellyActions, position?: number) {
    let url = `http://${ip}/roller/0?go=${action}`;
    if (action === 'to_pos' && position !== undefined) {
      url += `&roller_pos=${position}`;
    }
    return this.http.get(url);
  }
}
