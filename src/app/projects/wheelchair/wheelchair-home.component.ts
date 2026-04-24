import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WheelchairViewerComponent } from './viewer/viewer.component';
import { RulesComponent } from './rules/rules.component';
import { ThemeService } from '../../@shared/services/theme.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-wheelchair-home',
  standalone: true,
  imports: [
    WheelchairViewerComponent,
    RulesComponent,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './wheelchair-home.component.html',
  styleUrl: './wheelchair-home.component.scss',
})
export class WheelchairHomeComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  private themeSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(
      (isDark) => {
        this.isDarkMode = isDark;
      },
    );
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleTheme(event: Event) {
    event.stopPropagation();
    this.themeService.toggleTheme();
  }

  openRules(event: Event) {
    event.stopPropagation();
    this.dialog.open(RulesComponent, {
      width: '600px',
      maxWidth: '95vw',
      panelClass: 'retro-dialog'
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
