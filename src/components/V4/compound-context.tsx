/**
 * @description - compound context
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BehaviorSubject, fromEvent, merge } from 'rxjs';
import { distinctUntilChanged, map, scan } from 'rxjs/operators';
import { shallowEqual } from 'react-redux';

// internal
import {
  defaultDimensionPayload,
  defaultStatisticPayload,
} from '../../constant';

// scope
const defaultCompoundPayload = {
  ...defaultDimensionPayload,
  ...defaultStatisticPayload,
};

export const CompoundContext = createContext<
  BehaviorSubject<CompoundContextStructure>
>(new BehaviorSubject(defaultCompoundPayload));

export const Provider: FunctionComponent = (props) => {
  const payload$ = useMemo(
    () => new BehaviorSubject<CompoundContextStructure>(defaultCompoundPayload),
    []
  );

  useEffect(() => {
    const click$ = fromEvent(document, 'click').pipe(
      scan((acc) => acc + 1, 0),
      map((click) => ({ click }))
    );
    const keypress$ = fromEvent(document, 'keypress').pipe(
      scan((acc) => acc + 1, 0),
      map((keypress) => ({ keypress }))
    );
    const dimension$ = fromEvent(window, 'resize').pipe(
      map(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
      }))
    );

    const subscription = merge(click$, keypress$, dimension$)
      .pipe(scan((acc, curr) => ({ ...acc, ...curr }), defaultCompoundPayload))
      .subscribe((state) => payload$.next(state));

    return () => subscription.unsubscribe();
  }, []);

  return (
    <CompoundContext.Provider value={payload$}>
      {props.children}
    </CompoundContext.Provider>
  );
};
export function useSelector(
  selector: Selector,
  compare: Comparer = shallowEqual
) {
  const payload = useRef<Partial<CompoundContextStructure>>(defaultCompoundPayload);
  const payload$ = useContext(CompoundContext);
  const [, rerender] = useState(0);

  useEffect(() => {
    const subscription = payload$
      .pipe(
        map((state) => selector(state)),
        distinctUntilChanged((previous, current) => compare(previous, current))
      )
      .subscribe((state) => {
        payload.current = state;
        rerender((prev) => prev + 1);
      });

    return () => subscription.unsubscribe();
  }, []);

  return payload.current;
}
