import { Component, Input } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-no-elements-in-table',
    templateUrl: './no-elements-in-table.component.html',
    styleUrls: ['./no-elements-in-table.component.scss'],
    standalone: true,
    imports: [NgIf, FlexModule],
})
export class NoElementsInTableComponent {
  @Input() show: boolean;
}
