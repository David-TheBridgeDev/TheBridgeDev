import { Component, Input, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ShellyService } from '../../shelly.service';
import { ShellyActions } from '../../shelly-actions';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NotificationService } from '../../../../@shared/services/notification.service';
import {
  AppService,
  DeviceState,
} from '../../../../@shared/services/app.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-shelly-light',
  standalone: true,
  imports: [MatTooltip, MatProgressSpinner],
  templateUrl: './shelly-light.component.html',
  styleUrl: './shelly-light.component.scss',
})
export class ShellyLightComponent implements OnInit {
  @Input() public deviceName: string;
  @Input() public deviceIp: string;
  protected readonly ShellyActions = ShellyActions;
  protected readonly DeviceState = DeviceState;

  loading: boolean;

  deviceState: DeviceState = DeviceState.NORMAL;

  constructor(
    protected shellyService: ShellyService,
    private notificationService: NotificationService,
    private appService: AppService,
  ) {}

  ngOnInit(): void {
    this.appService.deviceState
      .pipe(untilDestroyed(this))
      .subscribe((state) => {
        this.deviceState = state;
      });
  }

  controlLight(action: string) {
    this.loading = true;
    this.shellyService.controlLight(this.deviceIp, action).subscribe({
      next: (obj) => console.log(obj),
      error: (e) => {
        this.notificationService.showError(JSON.stringify(e));
        console.error(e);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
