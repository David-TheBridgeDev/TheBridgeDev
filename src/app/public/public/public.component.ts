import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { TabsContainerComponent } from '../tabs/tabs-container/tabs-container.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
  standalone: true,
  imports: [HeaderComponent, TabsContainerComponent, FooterComponent],
})
export class PublicComponent implements OnInit {
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
