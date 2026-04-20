import { Component, Input, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ShellyActions } from '../../models/shelly-actions';
import { DeviceState } from '../../models/deviceState';
import { ShellyService } from '../../services/shelly.service';
import { NotificationService } from '../../../../@shared/services/notification.service';

@UntilDestroy()
@Component({
  selector: 'app-shelly-roller',
  standalone: true,
  imports: [FlexModule, MatIcon, MatTooltip, MatProgressSpinner],
  templateUrl: './shelly-roller.component.html',
  styleUrl: './shelly-roller.component.scss',
})
export class ShellyRollerComponent implements OnInit {
  @Input() public deviceName: string;
  @Input() public deviceIp: string;
  @Input() public toPosValue: number = null;
  protected readonly ShellyActions = ShellyActions;
  protected readonly DeviceState = DeviceState;

  protected readonly RollerPoss = [16, 25, 60, 80, 100];

  opening: boolean;
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

  actionStopRoller(action: string) {
    this.loading = true;
    this.shellyService
      .controlRoller(this.deviceIp, this.opening ? ShellyActions.STOP : action)
      .subscribe({
        next: (obj) => console.log(obj),
        error: (e) => {
          this.notificationService.showError(JSON.stringify(e));
          console.error(e);
          this.loading = false;
        },
        complete: () => {
          this.opening = !this.opening;
          this.loading = false;
        },
      });
  }

  toPosStop(value?: number) {
    this.loading = true;
    this.shellyService
      .controlRoller(
        this.deviceIp,
        this.opening ? ShellyActions.STOP : ShellyActions.TO_POS,
        value != undefined ? value : this.toPosValue,
      )
      .subscribe({
        next: (obj) => console.log(obj),
        error: (e) => {
          this.notificationService.showError(JSON.stringify(e));
          console.error(e);
          this.loading = false;
        },
        complete: () => {
          this.opening = !this.opening;
          this.loading = false;
        },
      });
  }
}
