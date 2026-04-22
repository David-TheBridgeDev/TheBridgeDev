import { Component, OnInit } from '@angular/core';
import { CircleOfFifthsComponent } from './circle-of-fifths/circle-of-fifths.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { FretboardViewerComponent } from './fretboard/fretboard-viewer/fretboard-viewer.component';
import { ChordScaleViewerComponent } from './chord-scale-viwer/chord-scale-viewer/chord-scale-viewer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-music-home',
  standalone: true,
  imports: [
    CircleOfFifthsComponent,
    MatTabGroup,
    MatTab,
    FretboardViewerComponent,
    ChordScaleViewerComponent,
    TranslateModule
  ],
  templateUrl: './music-home.component.html',
  styleUrl: './music-home.component.scss',
})
export class MusicHomeComponent implements OnInit {
  selectedIndex = 0;
  private tabHashes = ['circle', 'chords', 'scales'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      const index = this.tabHashes.indexOf(fragment || '');
      // Ensure we don't update if it's already the selected tab to avoid infinite loops
      if (index !== -1 && this.selectedIndex !== index) {
        this.selectedIndex = index;
      }
    });
  }

  onTabChange(index: number) {
    this.selectedIndex = index;
    this.router.navigate([], {
      relativeTo: this.route,
      fragment: this.tabHashes[index],
      replaceUrl: true
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
