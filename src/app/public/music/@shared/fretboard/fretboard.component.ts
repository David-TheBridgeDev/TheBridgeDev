import { Component, Input, OnInit } from '@angular/core';
import { Scale, ScalesDictionary } from '../../fretboard/fretboard-variables';

@Component({
  selector: 'app-fretboard',
  standalone: true,
  imports: [],
  templateUrl: './fretboard.component.html',
  styleUrl: './fretboard.component.scss',
})
export class FretboardComponent implements OnInit {
  // Recibe un array de 6 números que representan el acorde.
  // startAt es el capo, si es 0, no hay.
  // Cada chordNote representa el traste, si es 0 al aire, si es -1 no se toca
  // Cada chordDegrees representa el grado de cada nota. Si es 0 np se toca.

  @Input() scale: Scale = ScalesDictionary['major'];

  ngOnInit(): void {}
}
