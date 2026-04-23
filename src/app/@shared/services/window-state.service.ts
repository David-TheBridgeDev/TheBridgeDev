import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowStateService {
  private isMinimizedSubject = new BehaviorSubject<boolean>(false);
  private isCrashingSubject = new BehaviorSubject<boolean>(false);

  isMinimized$ = this.isMinimizedSubject.asObservable();
  isCrashing$ = this.isCrashingSubject.asObservable();

  toggleMinimize() {
    this.isMinimizedSubject.next(!this.isMinimizedSubject.value);
  }

  triggerCrash() {
    this.isCrashingSubject.next(true);
  }

  get isMinimized(): boolean {
    return this.isMinimizedSubject.value;
  }

  get isCrashing(): boolean {
    return this.isCrashingSubject.value;
  }
}
