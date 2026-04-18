import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map, shareReplay } from 'rxjs';

export function deepFreeze<T>(inObj: T): T {
  Object.freeze(inObj);

  Object.getOwnPropertyNames(inObj).forEach(function (prop) {
    if (
      inObj.hasOwnProperty(prop) &&
      inObj[prop] != null &&
      typeof inObj[prop] === 'object' &&
      !Object.isFrozen(inObj[prop])
    ) {
      deepFreeze(inObj[prop]);
    }
  });
  return inObj;
}

export function naiveObjectComparison(objOne, objTwo): boolean {
  return JSON.stringify(objOne) === JSON.stringify(objTwo);
}

function defaultMemoization(previousValue, currentValue): boolean {
  if (typeof previousValue === 'object' && typeof currentValue === 'object') {
    return naiveObjectComparison(previousValue, currentValue);
  }
  return previousValue === currentValue;
}

export type Selector<T, V> = (state: T) => V;

export function createSelector(...args: any[]): Selector<any, any> {
  return (state) => {
    const selectors = args.slice(0, args.length - 1);
    const projector = args[args.length - 1];

    return projector.apply(
      null,
      selectors.map((selector) => selector(state))
    );
  };
}

@Injectable({ providedIn: 'root' })
export abstract class Store<T> {
  private _state: BehaviorSubject<T>;

  constructor(@Inject('') initialState: T) {
    this._state = new BehaviorSubject<T>(deepFreeze(initialState));
  }

  get state$(): Observable<T> {
    return this._state.asObservable();
  }

  get state(): T {
    return this._state.getValue();
  }

  setState<K extends keyof T, E extends Partial<Pick<T, K>>>(fn: (state: T) => E): void {
    const state = fn(this.state);
    const frozenData = deepFreeze(state);

    if (!naiveObjectComparison(frozenData, this.state)) {
      this._state.next({ ...this.state, ...state });
    }
  }

  select<K>(selector: (state: T) => K): Observable<K> {
    return this.state$.pipe(map(selector), distinctUntilChanged(defaultMemoization), shareReplay(1));
  }
}
