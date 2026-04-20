import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

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
  private statsInterval: any;

  constructor(private translate: TranslateService) {
    const now = new Date();
    this.osVersion = `${now.getFullYear()}.${
      now.getMonth() + 1
    }.${now.getDate()}`;
    this.updateStats();
  }

  // Funciones de control de ventana
  closeWindow(): void {
    const confirmMsg = this.translate.instant('Footer.CloseConfirm');
    if (confirm(confirmMsg)) {
      window.location.reload();
    }
  }

  minimizeWindow(): void {
    this.isMinimized = !this.isMinimized;
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

  ngOnInit(): void {
    this.statsInterval = setInterval(() => {
      this.updateStats();
    }, 2200);
  }

  ngOnDestroy(): void {
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
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
