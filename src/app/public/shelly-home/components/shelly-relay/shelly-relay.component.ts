import { Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { ShellyService } from '../../shelly.service';
import { ShellyActions } from '../../shelly-actions';
import { NotificationService } from '../../../../@shared/services/notification.service';
import {
  AppService,
  DeviceState,
} from '../../../../@shared/services/app.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-shelly-relay',
  standalone: true,
  imports: [MatProgressSpinner, MatTooltip],
  templateUrl: './shelly-relay.component.html',
  styleUrl: './shelly-relay.component.scss',
})
export class ShellyRelayComponent implements OnInit {
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

  controlRelay(action: string) {
    this.loading = true;
    this.shellyService.controlRelayRPC(this.deviceIp, action).subscribe({
      next: (obj) => console.log(obj),
      error: (e) => {
        if (e.statusText != 'Unknown Error')
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
