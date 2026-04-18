import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReloadPageService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  reloadPage() {
    const url = this.router.url;
    this.router
      .navigateByUrl('reload', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([`/${url}`]).then(() => {});
      });
  }
}
