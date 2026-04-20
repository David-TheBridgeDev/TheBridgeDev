import { Component } from '@angular/core';
import { CircleOfFifthsComponent } from './circle-of-fifths/circle-of-fifths.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { FretboardViewerComponent } from './fretboard/fretboard-viewer/fretboard-viewer.component';
import { ChordScaleViewerComponent } from './chord-scale-viwer/chord-scale-viewer/chord-scale-viewer.component';

@Component({
  selector: 'app-music-home',
  standalone: true,
  imports: [
    CircleOfFifthsComponent,
    MatTabGroup,
    MatTab,
    FretboardViewerComponent,
    ChordScaleViewerComponent,
  ],
  templateUrl: './music-home.component.html',
  styleUrl: './music-home.component.scss',
})
export class MusicHomeComponent {}
