import { NgxColorsColor } from 'ngx-colors/lib/clases/color';
import { EventEmitter } from '@angular/core';

export interface ColorPickerConfigModel {
  color?: string;
  colorsAnimation?: 'slide-in' | 'popup';
  palette?: Array<string> | Array<NgxColorsColor>;
  format?: string;
  position?: 'top' | 'bottom';
  hideTextInput?: boolean;
  hideColorPicker?: boolean;
  attachTo?: string | undefined;
  overlayClassName?: string | undefined;
  colorPickerControls?: 'default' | 'only-alpha' | 'no-alpha';
  acceptLabel?: string;
  cancelLabel?: string;
  change?: EventEmitter<string>;
  input?: EventEmitter<string>;
  slider?: EventEmitter<string>;
  close?: EventEmitter<string>;
  open?: EventEmitter<string>;
}

export const ColorPickerConfig: ColorPickerConfigModel = {
  palette: [
    '#fd0000',
    '#fd7c01',
    '#fdd000',
    '#fdfd00',
    '#c6fd00',
    '#00fd00',
    '#00fdc2',
    '#00fdfd',
    '#00b2fd',
    '#005bfd',
    '#0000fd',
    '#5900fd',
    '#9900fd',
    '#fd00fd',
    '#fd007e',
  ],
  format: 'rgba',
  colorPickerControls: 'no-alpha',
  acceptLabel: 'Aceptar',
  cancelLabel: 'Cancelar',
};
