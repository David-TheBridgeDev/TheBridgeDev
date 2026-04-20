import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '../../../@shared/models/appRoutes';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [MatTooltipModule],
})
export class ProjectsComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

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
}
