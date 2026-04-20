import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-circle-of-fifths',
  standalone: true,
  imports: [NgStyle, MatSlider, MatSliderThumb, ReactiveFormsModule],
  templateUrl: './circle-of-fifths.component.html',
  styleUrl: './circle-of-fifths.component.scss',
})
export class CircleOfFifthsComponent implements OnInit {
  stepSelectionSlider: FormControl;

  deg: number = 0;
  key: string = 'C';

  majorNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  minorNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  keyDictionary = {
    0: { noteB: 'C', noteS: 'C', deg: 0 },
    7: { noteB: 'Db', noteS: 'C#', deg: 210 },
    2: { noteB: 'D', noteS: 'D', deg: 60 },
    9: { noteB: 'Eb', noteS: 'D#', deg: 270 },
    4: { noteB: 'E', noteS: 'E', deg: 120 },
    11: { noteB: 'F', noteS: 'F', deg: 330 },
    6: { noteB: 'Gb', noteS: 'F#', deg: 180 },
    1: { noteB: 'G', noteS: 'G', deg: 30 },
    8: { noteB: 'Ab', noteS: 'G#', deg: 240 },
    3: { noteB: 'A', noteS: 'A', deg: 90 },
    10: { noteB: 'Bb', noteS: 'A#', deg: 300 },
    5: { noteB: 'B', noteS: 'B', deg: 150 },
  };

  keySignatures = {
    0: { key: 'C', notes: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'] },
    7: { key: 'Db', notes: ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'Cdim'] },
    2: { key: 'D', notes: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'] },
    9: { key: 'Eb', notes: ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Ddim'] },
    4: { key: 'E', notes: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'] },
    11: { key: 'F', notes: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'] },
    6: { key: 'Gb', notes: ['Gb', 'Abm', 'Bbm', 'Cb', 'Db', 'Ebm', 'Fdim'] },
    1: { key: 'G', notes: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'] },
    8: { key: 'Ab', notes: ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'Gdim'] },
    3: { key: 'A', notes: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'] },
    10: { key: 'Bb', notes: ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim'] },
    5: { key: 'B', notes: ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim'] },
  };

  minorKeySignatures = {
    0: { key: 'Am', notes: ['Am', 'Bdim', 'C', 'Dm', 'Em', 'F', 'G'] },
    7: { key: 'Bbm', notes: ['Bbm', 'Cdim', 'Db', 'Ebm', 'Fm', 'Gb', 'Ab'] },
    2: { key: 'Bm', notes: ['Bm', 'C#dim', 'D', 'Em', 'F#m', 'G', 'A'] },
    9: { key: 'Cm', notes: ['Cm', 'Ddim', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb'] },
    4: { key: 'C#m', notes: ['C#m', 'D#dim', 'E', 'F#m', 'G#m', 'A', 'B'] },
    11: { key: 'Dm', notes: ['Dm', 'Edim', 'F', 'Gm', 'Am', 'Bb', 'C'] },
    6: { key: 'Ebm', notes: ['Ebm', 'Fdim', 'Gb', 'Abm', 'Bbm', 'Cb', 'Db'] },
    1: { key: 'Em', notes: ['Em', 'F#dim', 'G', 'Am', 'Bm', 'C', 'D'] },
    8: { key: 'Fm', notes: ['Fm', 'Gdim', 'Ab', 'Bbm', 'Cm', 'Db', 'Eb'] },
    3: { key: 'F#m', notes: ['F#m', 'G#dim', 'A', 'Bm', 'C#m', 'D', 'E'] },
    10: { key: 'Gm', notes: ['Gm', 'Adim', 'Bb', 'Cm', 'Dm', 'Eb', 'F'] },
    5: { key: 'G#m', notes: ['G#m', 'A#dim', 'B', 'C#m', 'D#m', 'E', 'F#'] },
  };

  private useSharp: boolean;

  constructor() {}

  ngOnInit(): void {
    this.getNotes(0);

    this.stepSelectionSlider = new FormControl();

    this.stepSelectionSlider.valueChanges
      .pipe(/*debounceTime(100)*/ untilDestroyed(this))
      .subscribe((step) => {
        this.deg = this.keyDictionary[step].deg;
        this.key = this.keyDictionary[step].noteB;
        this.getNotes(step);
      });

    this.useSharp = !!localStorage.getItem('useSharp');
  }

  getNotes(grade: number) {
    this.majorNotes = this.keySignatures[grade]['notes'];
    this.minorNotes = this.minorKeySignatures[grade]['notes'];
  }
}
