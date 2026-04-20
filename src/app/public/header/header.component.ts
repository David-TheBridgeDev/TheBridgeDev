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
  constructor(private translate: TranslateService) {}

  get currentLang(): string {
    return this.translate.currentLang || 'en';
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
