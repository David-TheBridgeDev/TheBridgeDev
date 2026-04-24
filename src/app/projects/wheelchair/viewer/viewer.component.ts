import { Component } from '@angular/core';
import { WheelchairProjectViewerComponent } from './3d-engine/wheelchair-project-viewer.component';

@Component({
  selector: 'app-wheelchair-viewer',
  standalone: true,
  imports: [WheelchairProjectViewerComponent],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
})
export class WheelchairViewerComponent {}
