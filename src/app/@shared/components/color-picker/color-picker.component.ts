import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { validColorValidator, NgxColorsModule } from 'ngx-colors';
import { ColorPickerConfig } from '../../config/ColorPickerConfigModel';
import { NgIf } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        NgxColorsModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class ColorPickerComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() setActive = new Subject<boolean>();
  @Input() setColor = new Subject<string>();
  @Output() colorSelected = new EventEmitter<string>();

  formControl: FormControl<string>;

  ColorPickerConfig = ColorPickerConfig;

  previewColor: string;

  constructor() {
    this.formControl = new FormControl<string>('', validColorValidator());
  }

  ngOnInit() {
    this.setColor.pipe(untilDestroyed(this)).subscribe((color) => {
      this.previewColor = color;
      this.formControl.setValue(color, { emitEvent: false });
    });

    this.setActive.pipe(untilDestroyed(this)).subscribe((active) => {
      if (active) this.formControl.enable({ emitEvent: false });
      else this.formControl.disable({ emitEvent: false });
    });
  }

  formControlChange(color: string) {
    if (
      !!color &&
      this.formControl.valid &&
      this.formControl.value != this.previewColor
    ) {
      this.previewColor = color;
      this.colorSelected.emit(color);
    }
  }
}
