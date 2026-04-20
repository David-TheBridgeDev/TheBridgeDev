import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../../@shared/models/appRoutes';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [MatTooltipModule, RouterLink],
})
export class ProjectsComponent {
  protected readonly AppRoutes = AppRoutes;
}
