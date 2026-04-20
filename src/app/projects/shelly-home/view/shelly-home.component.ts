import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { ShellyService } from '../shelly.service';
import { DevicesIp } from '../devices-ip';
import { ShellyRollerComponent } from '../components/shelly-roller/shelly-roller.component';
import { ShellyLightComponent } from '../components/shelly-light/shelly-light.component';
import { ShellyRelayComponent } from '../components/shelly-relay/shelly-relay.component';
import { MatTooltip } from '@angular/material/tooltip';
import { AppService, DeviceState } from '../../../@shared/services/app.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ShellyGlobalActionComponent } from '../components/shelly-global-action/shelly-global-action.component';
import { ShellyGlobalActions } from '../shelly-global-action';

@UntilDestroy()
@Component({
  selector: 'app-shelly-home',
  standalone: true,
  imports: [
    MatIconModule,
    FlexModule,
    ShellyRollerComponent,
    ShellyLightComponent,
    ShellyRelayComponent,
    MatTooltip,
    ShellyGlobalActionComponent,
  ],
  templateUrl: './shelly-home.component.html',
  styleUrl: './shelly-home.component.scss',
})
export class ShellyHomeComponent implements OnInit {
  protected readonly ShellyGlobalActions = ShellyGlobalActions;
  protected readonly DevicesIp = DevicesIp;

  deviceState: DeviceState = DeviceState.NORMAL;

  constructor(
    protected shellyService: ShellyService,
    private appService: AppService,
  ) {}

  ngOnInit(): void {}

  switchState() {
    if (this.deviceState == DeviceState.NORMAL) {
      this.appService.deviceState.next(DeviceState.STEP);
      this.deviceState = DeviceState.STEP;
    } else {
      this.appService.deviceState.next(DeviceState.NORMAL);
      this.deviceState = DeviceState.NORMAL;
    }
  }

  refreshPage() {
    window.location.reload();
  }
}
