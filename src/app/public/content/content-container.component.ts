import { Component, OnInit } from '@angular/core';
import { ExperienceComponent } from './experience/experience.component';
import { WheelchairComponent } from '../../@shared/threeJS/wheelchair/wheelchair.component';
import { TranslatePipe } from '@ngx-translate/core';
import { SkillsComponent } from './skills/skills.component';
import { ToolsComponent } from './tools/tools.component';

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
    TranslatePipe,
  ],
})
export class ContentContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
