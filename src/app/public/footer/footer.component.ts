import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { AppRoutes } from '../../@shared/models/appRoutes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [TranslateModule, RouterLink, MatTooltipModule, CommonModule],
})
export class FooterComponent implements OnInit {
  protected readonly AppRoutes = AppRoutes;

  ngOnInit(): void {}
}
