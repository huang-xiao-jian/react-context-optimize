/**
 * @description - compound context
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { fromEvent, merge } from 'rxjs';
import { map, scan } from 'rxjs/operators';

// internal
import { defaultDimensionPayload, defaultStatisticPayload } from '../../constant';

// scope
export const StatisticContext = createContext<Statistic>(
  defaultStatisticPayload,
);
export const DimensionContext = createContext<Dimension>(
  defaultDimensionPayload,
);

export const DimensionProvider: FunctionComponent = (props) => {
  const [state, setState] = useState(defaultDimensionPayload);

  useEffect(() => {
    const dimension$ = fromEvent(window, 'resize').pipe(
      map(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
      })),
    );

    const subscription = dimension$.subscribe((action) => {
      setState(action);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <DimensionContext.Provider value={state}>
      {props.children}
    </DimensionContext.Provider>
  );
};

export const StatisticProvider: FunctionComponent = (props) => {
  const [state, setState] = useState(defaultStatisticPayload);

  useEffect(() => {
    const click$ = fromEvent(document, 'click').pipe(
      scan((acc) => acc + 1, 0),
      map((click) => ({ click })),
    );
    const keypress$ = fromEvent(document, 'keypress').pipe(
      scan((acc) => acc + 1, 0),
      map((keypress) => ({ keypress })),
    );

    const subscription = merge(click$, keypress$).subscribe(
      (action) => {
        setState((acc) => ({
          ...acc,
          ...action,
        }));
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <StatisticContext.Provider value={state}>
      {props.children}
    </StatisticContext.Provider>
  );
};
