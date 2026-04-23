import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { WindowStateService } from './@shared/services/window-state.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-root',
  template: `
    <main [class.system-crashing]="isCrashing">
      <router-outlet></router-outlet>
    </main>

    @if (isCrashing) {
      <div class="bsod-overlay">
        <div class="bsod-content">
          <div class="bsod-header">
            <span class="bsod-tag">Windows</span>
          </div>
          <p>A fatal exception 0E has occurred at 0028:C0001125 in VXD VMM(01) + 00000125. The current application will be terminated.</p>
          
          <ul class="bsod-instructions">
            <li>*  Press any key to terminate the current application.</li>
            <li>*  Press CTRL+ALT+DEL again to restart your computer. You will lose any unsaved information in all applications.</li>
          </ul>

          <p class="bsod-center">Press any key to continue <span class="blink">_</span></p>
          
          <div class="bsod-footer">
            <p>Technical information:</p>
            <p>*** STOP: 0x000000D1 (0x0000000C, 0x00000002, 0x00000000, 0xF86B5A89)</p>
            <p>*** thebridge_sys.sys - Address F86B5A89 base at F86B5000</p>
          </div>
          
          <div class="collecting-info">
            SYSTEM_HALT: REBOOT_IN_PROGRESS (5s)
          </div>
        </div>
        <div class="scanlines"></div>
        <div class="crt-flicker"></div>
      </div>
    }
  `,
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
})
export class AppComponent implements OnInit, OnDestroy {
  isCrashing = false;
  private crashSubscription!: Subscription;

  constructor(
    private translate: TranslateService,
    private windowStateService: WindowStateService,
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.crashSubscription = this.windowStateService.isCrashing$.subscribe(
      (crashing) => {
        this.isCrashing = crashing;
      },
    );
  }

  ngOnDestroy() {
    if (this.crashSubscription) {
      this.crashSubscription.unsubscribe();
    }
  }
}
