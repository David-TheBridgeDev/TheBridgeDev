import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
    standalone: true,
})
export class PageNotFoundComponent {
  constructor(
    private log: NGXLogger,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  navegateLogin() {
    this.router.navigate(['user/unity'], {
      relativeTo: this.route.parent.parent,
      queryParamsHandling: 'preserve',
    });
  }
}
