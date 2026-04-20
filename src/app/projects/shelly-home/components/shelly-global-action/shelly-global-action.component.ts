import { Component, Input, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NotificationService } from '../../../../@shared/services/notification.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ShellyService } from '../../services/shelly.service';
import { ShellyActions } from '../../models/shelly-actions';
import { ShellyGlobalActions } from '../../models/shelly-global-action';
import { DeviceState } from '../../models/deviceState';

@UntilDestroy()
@Component({
  selector: 'app-shelly-global-action',
  standalone: true,
  imports: [MatTooltip, MatProgressSpinner],
  templateUrl: './shelly-global-action.component.html',
  styleUrl: './shelly-global-action.component.scss',
})
export class ShellyGlobalActionComponent implements OnInit {
  @Input() public name: string;
  @Input() public actions = ShellyGlobalActions.DAY;

  loading: boolean;
  deviceState: DeviceState = DeviceState.NORMAL;

  constructor(
    protected shellyService: ShellyService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.shellyService.deviceState
      .pipe(untilDestroyed(this))
      .subscribe((state) => {
        this.deviceState = state;
      });
  }

  triggerAction() {
    this.loading = true;
    this.actions.forEach((device) => {
      this.shellyService
        .controlRoller(device.ip, ShellyActions.TO_POS, device.pos)
        .subscribe({
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
    });
  }
}
