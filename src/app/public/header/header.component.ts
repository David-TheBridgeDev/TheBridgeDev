import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { WindowStateService } from '../../@shared/services/window-state.service';
import { ThemeService } from '../../@shared/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  osVersion: string;
  cpuUsage: number = 0;
  memUsage: number = 0;
  isMinimized: boolean = false;
  isDarkMode: boolean = false;
  private statsInterval: any;
  private windowStateSubscription!: Subscription;
  private themeSubscription!: Subscription;

  constructor(
    private translate: TranslateService,
    private windowStateService: WindowStateService,
    private themeService: ThemeService,
  ) {
    const now = new Date();
    this.osVersion = `${now.getFullYear()}.${
      now.getMonth() + 1
    }.${now.getDate()}`;
    this.updateStats();
  }

  // Funciones de control de ventana
  closeWindow(): void {
    this.windowStateService.triggerCrash();
    // Auto-reload after the "brutal" sequence
    setTimeout(() => {
      window.location.reload();
    }, 6000);
  }

  minimizeWindow(): void {
    this.windowStateService.toggleMinimize();
  }

  maximizeWindow(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error intentando activar el modo pantalla completa: ${err.message}`,
        );
      });
    } else {
      document.exitFullscreen();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  ngOnInit(): void {
    this.statsInterval = setInterval(() => {
      this.updateStats();
    }, 2200);

    this.windowStateSubscription = this.windowStateService.isMinimized$.subscribe(
      (minimized) => {
        this.isMinimized = minimized;
      },
    );

    this.themeSubscription = this.themeService.isDarkMode$.subscribe(
      (isDark) => {
        this.isDarkMode = isDark;
      },
    );
  }

  ngOnDestroy(): void {
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
    }
    if (this.windowStateSubscription) {
      this.windowStateSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  private updateStats(): void {
    this.cpuUsage = Math.floor(Math.random() * 8) + 1; // 1-8%
    this.memUsage = Math.floor(Math.random() * (512 - 128 + 1)) + 128; // 128-512MB
  }

  get currentLang(): string {
    return this.translate.currentLang || 'en';
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
