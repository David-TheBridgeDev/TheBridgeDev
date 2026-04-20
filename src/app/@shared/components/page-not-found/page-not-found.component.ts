import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  constructor() {}
}
