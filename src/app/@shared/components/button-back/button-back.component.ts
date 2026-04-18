import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-button-back',
    templateUrl: './button-back.component.html',
    styleUrls: ['./button-back.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatTooltipModule, MatIconModule]
})
export class ButtonBackComponent {

}
