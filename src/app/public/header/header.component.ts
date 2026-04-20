import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule],
})
export class HeaderComponent {
  osVersion: string;
  cpuUsage: number;
  memUsage: number;

  constructor(private translate: TranslateService) {
    const now = new Date();
    this.osVersion = `${now.getFullYear()}.${
      now.getMonth() + 1
    }.${now.getDate()}`;
    this.cpuUsage = Math.floor(Math.random() * 8) + 2; // 1-5%
    this.memUsage = Math.floor(Math.random() * (512 - 64 + 1)) + 64; // 64-512MB
  }

  get currentLang(): string {
    return this.translate.currentLang || 'en';
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
