import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  standalone: true,
  imports: [MatTooltipModule],
})
export class ToolsComponent {}
