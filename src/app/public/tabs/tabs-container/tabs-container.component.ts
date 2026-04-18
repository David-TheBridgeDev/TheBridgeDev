import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WheelchairComponent } from '../../../@shared/threeJS/wheelchair/wheelchair.component';
import { VrComponent } from '../vr/vr.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '../../../@shared/models/appRoutes';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss'],
  standalone: true,
  imports: [WheelchairComponent, MatTooltipModule, VrComponent],
})
export class TabsContainerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    let tagSelectors = document.getElementsByClassName('TagSelector');

    for (let i = 0; i < tagSelectors.length; i++) {
      tagSelectors[i].addEventListener('click', (e) => {
        for (let j = 0; j < tagSelectors.length; j++) {
          tagSelectors[j].className = 'TagSelector';
        }
        // @ts-ignore
        e.target.className = 'TagSelector active';
        // @ts-ignore
        this.changeTab(e.target.getAttribute('tag'));
      });
    }
  }

  changeTab(e: string) {
    let TagSelectors = document.getElementsByClassName('tabElement');
    for (let i = 0; i < TagSelectors.length; i++) {
      TagSelectors[i].classList.add('hidden');
    }

    if (e == 'vr') {
      document.getElementById('container_vr').classList.remove('hidden');
      this.scrollToElement('container_vr');
    } else if (e == 'threejs') {
      document.getElementById('container_threejs').classList.remove('hidden');
      this.scrollToElement('container_threejs');
    } else if (e == 'skills') {
      document.getElementById('container_skills').classList.remove('hidden');
      this.scrollToElement('container_skills');
    } else if (e == 'tools') {
      document.getElementById('container_tools').classList.remove('hidden');
      this.scrollToElement('container_tools');
    } else if (e == 'art') {
      document.getElementById('container_art').classList.remove('hidden');
      this.scrollToElement('container_art');
    } else if (e == 'projects') {
      document.getElementById('container_projects').classList.remove('hidden');
      this.scrollToElement('container_projects');
    }
  }

  navegateToDomotic() {
    this.router.navigate([AppRoutes.HOME_AUTOMATION], {
      relativeTo: this.route.parent,
    });
  }

  navegateToMusic() {
    this.router.navigate([AppRoutes.MUSIC], {
      relativeTo: this.route.parent,
    });
  }

  scrollToElement(id: string): void {
    const element = document.getElementById('tab_header');
    if (element) {
      const yOffset = -10; // desplazamiento negativo
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  }
}
