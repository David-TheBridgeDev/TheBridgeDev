import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '../../models/appRoutes';

@Component({
  selector: 'app-home-redirect',
  template: ``,
  standalone: true,
})
export class HomeRedirectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.router.navigate([AppRoutes.HOME], {});
  }
}
