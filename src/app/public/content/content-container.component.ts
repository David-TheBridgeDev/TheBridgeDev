import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '../../@shared/models/appRoutes';
import { WheelchairComponent } from '../../@shared/threeJS/wheelchair/wheelchair.component';
import { VrComponent } from './vr/vr.component';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss'],
  standalone: true,
  imports: [WheelchairComponent, MatTooltipModule, VrComponent],
})
export class ContentContainerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {}

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
