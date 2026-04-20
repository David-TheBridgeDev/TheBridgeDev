import { Component, OnInit } from '@angular/core';
import { ArtComponent } from './art/art.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { ToolsComponent } from './tools/tools.component';
import { VrComponent } from './vr/vr.component';
import { WheelchairComponent } from '../../@shared/threeJS/wheelchair/wheelchair.component';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss'],
  standalone: true,
  imports: [
    SkillsComponent,
    ToolsComponent,
    ArtComponent,
    ProjectsComponent,
    VrComponent,
    WheelchairComponent,
  ],
})
export class ContentContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
