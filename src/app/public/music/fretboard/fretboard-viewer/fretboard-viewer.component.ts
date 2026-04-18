import { Component } from '@angular/core';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { FretboardComponent } from '../../@shared/fretboard/fretboard.component';
import { Scale, ScalesDictionary } from '../fretboard-variables';
import { MusicUtilsService } from '../../@shared/music-utils.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-fretboard-viewer',
  standalone: true,
  imports: [MatButton, MatTooltip, FretboardComponent, MatFabButton, MatIcon],
  templateUrl: './fretboard-viewer.component.html',
  styleUrl: './fretboard-viewer.component.scss',
})
export class FretboardViewerComponent {
  offset: number = 0;
  scale: Scale;
  scaleSelected: string;
  scaleBtn: { name: string; description: string }[] = [];

  constructor(private musicUtilsService: MusicUtilsService) {
    for (let key in ScalesDictionary) {
      this.scaleBtn.push({
        name: key,
        description: ScalesDictionary[key].name,
      });
    }

    this.selectScale('major');
  }

  selectScale(scaleName: string) {
    this.scaleSelected = scaleName;
    this.scale = {
      name: ScalesDictionary[this.scaleSelected.toLowerCase()].name,
      degrees: this.musicUtilsService.rotate2DArray(
        ScalesDictionary[this.scaleSelected.toLowerCase()].degrees,
        this.offset,
      ),
    };
  }

  incrementOffset(number: number) {
    this.offset += number;
    this.selectScale(this.scaleSelected);
  }
}
