import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  standalone: true,
  imports: [MatTooltipModule, TranslateModule, NgOptimizedImage],
})
export class ToolsComponent {
  protected readonly tools = [
    { name: 'intellij', icon: 'assets/images/png/ides/intellij.png' },
    { name: 'vscode', icon: 'assets/images/png/ides/vscode.png' },
    { name: 'rider', icon: 'assets/images/png/ides/rider.png' },
    { name: 'eclipse', icon: 'assets/images/png/ides/eclipse.png' },
    { name: 'vs', icon: 'assets/images/png/ides/vs.png' },
    { name: 'atom', icon: 'assets/images/png/ides/atom.png' },
    { name: 'WebStorm', icon: 'assets/images/png/ides/WebStorm.png' },
    { name: 'github', icon: 'assets/images/png/devtools/github.png' },
    { name: 'terminal', icon: 'assets/images/png/devtools/terminal.png' },
    { name: 'git', icon: 'assets/images/png/devtools/git.png' },
  ];
}
