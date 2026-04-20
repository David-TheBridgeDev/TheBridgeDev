import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutes } from '../../models/appRoutes';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: true,
  imports: [RouterLink, TranslateModule],
})
export class PageNotFoundComponent {
  protected readonly AppRoutes = AppRoutes;

  constructor(
    private log: NGXLogger,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  navegateToHome() {
    this.router.navigate([''], {
      relativeTo: this.route.parent?.parent,
      queryParamsHandling: 'preserve',
    });
  }
}
