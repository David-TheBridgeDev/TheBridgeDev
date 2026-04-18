import { DevicesIp } from './devices-ip';

export class ShellyGlobalActions {
  public static DAY = [
    {
      ip: DevicesIp.H_DAVID,
      pos: 80,
    },
    {
      ip: DevicesIp.H_MAE,
      pos: 80,
    },
    {
      ip: DevicesIp.SALON_1,
      pos: 80,
    },
    {
      ip: DevicesIp.SALON_3,
      pos: 50,
    },
    {
      ip: DevicesIp.SALON_4,
      pos: 80,
    },
  ];
  public static NIGHT = [
    {
      ip: DevicesIp.H_DAVID,
      pos: 30,
    },
    {
      ip: DevicesIp.H_MAE,
      pos: 30,
    },
    {
      ip: DevicesIp.SALON_1,
      pos: 30,
    },
    {
      ip: DevicesIp.SALON_3,
      pos: 10,
    },
    {
      ip: DevicesIp.SALON_4,
      pos: 30,
    },
  ];
}
