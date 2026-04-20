import { Component } from '@angular/core';
import { ChordComponent } from '../chord/chord.component';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { Chord, ChordsDictionary } from '../chords-variables';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-chord-viewer',
  standalone: true,
  imports: [ChordComponent, MatTooltip, MatButton, MatIcon, MatFabButton],
  templateUrl: './chord-viewer.component.html',
  styleUrl: './chord-viewer.component.scss',
})
export class ChordViewerComponent {
  chords: Chord[] = ChordsDictionary['major'];

  chordsBtn: string[] = [
    'major',
    'minor',
    'dim º',
    'aug +',
    'sus 4',
    'sus 2',
    '6',
    'm6',
    '7',
    'm7',
    'maj7 △',
    'dim 7',
    'm7(b5)',
    '9',
    'add 9',
    'm 9',
    'maj 9',
    '11',
    'm 11',
    'maj 11',
    '13',
    'm 13',
    'maj 13',
    '6/9',
  ];

  selectChord(chordName: string) {
    this.chords = ChordsDictionary[chordName.toLowerCase()];
  }
}
