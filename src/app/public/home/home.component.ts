import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ContentContainerComponent } from '../content/content-container.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [HeaderComponent, ContentContainerComponent, FooterComponent],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupScrollSpy();
    this.handleInitialScroll();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupScrollSpy(): void {
    const options = {
      root: null,
      rootMargin: '-10% 0px -20% 0px', // Responsive trigger margins
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            this.updateUrlFragment(id);
          }
        }
      });
    }, options);

    // Observe Header, Footer and Section Headers
    const elementsToObserve = [
      'app-header[id]',
      'app-footer[id]',
      '.retro-section-header[id]'
    ];

    elementsToObserve.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => this.observer.observe(el));
    });
  }

  private updateUrlFragment(id: string): void {
    // If we're at the top (home), clear the fragment instead of adding #home
    const fragment = id === 'home' ? null : id;
    
    const urlTree = this.router.createUrlTree([], { 
      relativeTo: this.route, 
      fragment: fragment 
    });
    
    const url = this.router.serializeUrl(urlTree);
    this.location.go(url);
  }

  private handleInitialScroll(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      }
    });
  }
}
