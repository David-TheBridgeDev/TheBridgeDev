import { Component } from '@angular/core';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { ChordScaleDictionary } from '../../chord-scale-viwer/chord-scale-variables';
import { FretboardComponent } from '../../@shared/fretboard/fretboard.component';
import { Scale } from '../../fretboard/fretboard-variables';
import { MatIcon } from '@angular/material/icon';
import { MusicUtilsService } from '../../@shared/music-utils.service';

@Component({
  selector: 'app-chord-scale-viewer',
  standalone: true,
  imports: [MatButton, MatTooltip, FretboardComponent, MatFabButton, MatIcon],
  templateUrl: './chord-scale-viewer.component.html',
  styleUrl: './chord-scale-viewer.component.scss',
})
export class ChordScaleViewerComponent {
  offset: number = 0;
  scale: Scale;
  scaleSelected: string;
  scaleBtn: { name: string; description: string }[] = [];

  constructor(private musicUtilsService: MusicUtilsService) {
    for (let key in ChordScaleDictionary) {
      this.scaleBtn.push({
        name: key,
        description: ChordScaleDictionary[key].description,
      });
    }

    this.selectChordScale('major');
  }

  selectChordScale(scaleName: string) {
    this.scaleSelected = scaleName;
    this.scale = {
      name: ChordScaleDictionary[this.scaleSelected.toLowerCase()].name,
      degrees: this.musicUtilsService.rotate2DArray(
        ChordScaleDictionary[this.scaleSelected.toLowerCase()].degrees,
        this.offset,
      ),
    };
  }

  incrementOffset(number: number) {
    this.offset += number;
    this.selectChordScale(this.scaleSelected);
  }
}
