/**
 * @description - compound context
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { fromEvent, merge } from 'rxjs';
import { map, scan } from 'rxjs/operators';

// internal
import {
  defaultDimensionPayload,
  defaultStatisticPayload,
} from '../../constant';

// scope
const defaultCompoundPayload = {
  ...defaultStatisticPayload,
  ...defaultDimensionPayload,
};

export const CompoundContext = createContext<CompoundContextStructure>(defaultCompoundPayload);

export const Provider: FunctionComponent = (props) => {
  const [state, setState] = useState(defaultCompoundPayload);

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

    const subscription = merge(click$, keypress$, dimension$).subscribe(
      (action) => {
        setState((acc) => ({
          ...acc,
          ...action,
        }));
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <CompoundContext.Provider value={state}>
      {props.children}
    </CompoundContext.Provider>
  );
};
