import { Routes } from '@angular/router';
import { CircleOfFifthsComponent } from './circle-of-fifths/circle-of-fifths.component';
import { FretboardViewerComponent } from './fretboard/fretboard-viewer/fretboard-viewer.component';
import { ChordScaleViewerComponent } from './chord-scale-viwer/chord-scale-viewer/chord-scale-viewer.component';
import { MusicHomeComponent } from './music-home.component';

export const MUSIC_ROUTES: Routes = [
  {
    path: '',
    component: MusicHomeComponent,
  },
  {
    path: 'chord-viewer',
    component: ChordScaleViewerComponent,
  },
  {
    path: 'circle-of-fifths',
    component: CircleOfFifthsComponent,
  },
  {
    path: 'fretboard',
    component: FretboardViewerComponent,
  },
];
