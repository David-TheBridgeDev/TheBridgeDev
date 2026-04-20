import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class ExperienceComponent {
  experiences = [
    'Seidor',
    'SeidorAgriculture',
    'Neurobai',
    'AxpeSantander',
    'AxpeJusticia',
    'BSRRV',
  ];

  expandedIndex: number | null = null;

  toggleExperience(index: number): void {
    if (this.expandedIndex === index) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = index;
    }
  }
}
