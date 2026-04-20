import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class HomeComponent implements OnInit {
  private selectedPlan: 'standard' | 'premium' | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.selectedPlan = 'standard';
  }

  scrollToElement(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = 0; // desplazamiento negativo
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  }
}
