import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowStateService {
  private isMinimizedSubject = new BehaviorSubject<boolean>(false);
  isMinimized$ = this.isMinimizedSubject.asObservable();

  toggleMinimize() {
    this.isMinimizedSubject.next(!this.isMinimizedSubject.value);
  }

  get isMinimized(): boolean {
    return this.isMinimizedSubject.value;
  }
}
