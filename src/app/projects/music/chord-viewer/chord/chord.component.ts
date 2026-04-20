import { Component, Input, OnInit } from '@angular/core';
import { Chord, ChordsDictionary } from '../chords-variables';

@Component({
  selector: 'app-chord',
  standalone: true,
  imports: [],
  templateUrl: './chord.component.html',
  styleUrl: './chord.component.scss',
})
export class ChordComponent implements OnInit {
  @Input() chord: Chord = ChordsDictionary['major'][0];

  ngOnInit(): void {}
}
