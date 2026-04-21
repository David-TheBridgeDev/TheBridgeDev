import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-strengths',
  templateUrl: './strengths.component.html',
  styleUrls: ['./strengths.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule],
})
export class StrengthsComponent {
  strengths = [
    {
      id: 'AI',
      icon: 'smart_toy',
      tag: 'AI',
    },
    {
      id: 'Backend',
      icon: 'dns',
      tag: 'BACK',
    },
    {
      id: 'Frontend',
      icon: 'web',
      tag: 'FRONT',
    },
    {
      id: 'Mobility',
      icon: 'devices',
      tag: 'MOB',
    },
    {
      id: 'Security',
      icon: 'security',
      tag: 'SEC',
    },
  ];
}
