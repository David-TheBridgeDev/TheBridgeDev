import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const SnackBarConfig = {
  duration: 3000,
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private _snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  showOk() {
    this.showMessage('Operación realizada con éxito', 'Ok');
  }

  showError(txt?: string) {
    this.showMessage('Se ha producido un error: ' + txt, 'Ok');
  }

  showCustomMessage(body: string) {
    this.showMessage(body, 'Ok');
  }

  showCustomMessageLongTime(body: string) {
    this._snackBar.open(body, 'Ok', {
      duration: 5000,
    });
  }

  showCustomMessageForEver(body: string, action: string) {
    return this._snackBar.open(body, action);
  }

  private showMessage(body: string, button: string) {
    this._snackBar.open(body, button, SnackBarConfig);
  }
}
