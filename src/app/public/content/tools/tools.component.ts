import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  standalone: true,
  imports: [MatTooltipModule, TranslateModule],
})
export class ToolsComponent {
  protected readonly tools = [
    { name: 'intellij', icon: 'assets/images/png/ides/intellij.png' },
    { name: 'WebStorm', icon: 'assets/images/png/ides/WebStorm.png' },
    { name: 'rider', icon: 'assets/images/png/ides/rider.png' },
    { name: 'eclipse', icon: 'assets/images/png/ides/eclipse.png' },
    { name: 'vscode', icon: 'assets/images/png/ides/vscode.png' },
    { name: 'atom', icon: 'assets/images/png/ides/atom.png' },
    { name: 'github', icon: 'assets/images/png/devtools/github.png' },
  ];
}
