import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExperienceComponent } from './experience/experience.component';
import { WheelchairComponent } from '../../@shared/threeJS/wheelchair/wheelchair.component';
import { TranslatePipe } from '@ngx-translate/core';
import { SkillsComponent } from './skills/skills.component';
import { ToolsComponent } from './tools/tools.component';
import { StrengthsComponent } from './strengths/strengths.component';
import { WindowStateService } from '../../@shared/services/window-state.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss'],
  standalone: true,
  imports: [
    SkillsComponent,
    ToolsComponent,
    ExperienceComponent,
    WheelchairComponent,
    StrengthsComponent,
    TranslatePipe,
    CommonModule,
  ],
})
export class ContentContainerComponent implements OnInit, OnDestroy {
  isMinimized: boolean = false;
  private windowStateSubscription!: Subscription;

  // Track individual section states
  sections = {
    strengths: true,
    threejs: true,
    skills: true,
    tools: true,
    experience: true,
  };

  constructor(private windowStateService: WindowStateService) {}

  ngOnInit(): void {
    this.windowStateSubscription = this.windowStateService.isMinimized$.subscribe(
      (minimized) => {
        this.isMinimized = minimized;
        // If global minimize is triggered, collapse all sections
        if (minimized) {
          this.setAllSections(false);
        } else {
          this.setAllSections(true);
        }
      },
    );
  }

  toggleSection(section: keyof typeof this.sections): void {
    this.sections[section] = !this.sections[section];
  }

  private setAllSections(value: boolean): void {
    Object.keys(this.sections).forEach((key) => {
      this.sections[key as keyof typeof this.sections] = value;
    });
  }

  ngOnDestroy(): void {
    if (this.windowStateSubscription) {
      this.windowStateSubscription.unsubscribe();
    }
  }
}
