import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { WheelchairViewerComponent } from './viewer/viewer.component';
import { RulesComponent } from './rules/rules.component';
import { PhilosophyComponent } from './philosophy/philosophy.component';
import { ThemeService } from '../../@shared/services/theme.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wheelchair-home',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    WheelchairViewerComponent,
    RulesComponent,
    PhilosophyComponent,
    CommonModule,
  ],
  templateUrl: './wheelchair-home.component.html',
  styleUrl: './wheelchair-home.component.scss',
})
export class WheelchairHomeComponent implements OnInit, OnDestroy {
  selectedIndex = 0;
  isDarkMode = false;
  private tabHashes = ['viewer', 'rules', 'philosophy'];
  private themeSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const index = this.tabHashes.indexOf(fragment);
        if (index !== -1) {
          this.selectedIndex = index;
        }
      }
    });

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

  onTabChange(index: number) {
    this.selectedIndex = index;
    this.router.navigate([], {
      relativeTo: this.route,
      fragment: this.tabHashes[index],
      replaceUrl: true,
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
