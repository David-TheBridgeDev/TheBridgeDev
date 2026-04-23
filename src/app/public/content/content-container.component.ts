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

  constructor(private windowStateService: WindowStateService) {}

  ngOnInit(): void {
    this.windowStateSubscription = this.windowStateService.isMinimized$.subscribe(
      (minimized) => {
        this.isMinimized = minimized;
      },
    );
  }

  ngOnDestroy(): void {
    if (this.windowStateSubscription) {
      this.windowStateSubscription.unsubscribe();
    }
  }
}
