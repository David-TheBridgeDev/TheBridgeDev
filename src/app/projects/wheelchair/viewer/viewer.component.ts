import { Component, ViewChild } from '@angular/core';
import { WheelchairProjectViewerComponent } from './3d-engine/wheelchair-project-viewer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wheelchair-viewer',
  standalone: true,
  imports: [WheelchairProjectViewerComponent, CommonModule],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
})
export class WheelchairViewerComponent {
  @ViewChild(WheelchairProjectViewerComponent) 
  threeEngine!: WheelchairProjectViewerComponent;

  environments = [
    { id: 'venice_sunset_1k', name: 'Venice Sunset' },
    { id: 'apartment', name: 'Apartment' },
    { id: 'factory', name: 'Factory' },
    { id: 'field_sky', name: 'Open Field' },
    { id: 'living_room', name: 'Living Room' },
  ];

  selectedEnv = 'venice_sunset_1k';

  updateEnvironment(envId: string) {
    this.selectedEnv = envId;
    if (this.threeEngine) {
      this.threeEngine.changeHDR(envId);
    }
  }
}
