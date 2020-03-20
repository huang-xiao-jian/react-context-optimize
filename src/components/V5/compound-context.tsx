/**
 * @description - compound context
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import React, {
  Component,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { fromEvent, merge, Subscription } from 'rxjs';
import { map, scan } from 'rxjs/operators';

// interfaces
interface AccessStateProxyCache {
  accessKeys: string[];
  callback: () => void;
}

interface Level1Proxy<T> {
  subscribe: (render: (arg0: any) => void) => void;
  track: () => void;
  state: T;
}

interface Tracker {
  identity: string;

  (keys: string[]): void;
}

interface CompoundContextGeneric {
  [key: string]: Level1Proxy<CompoundContextStructure>;
}

export const CompoundContext = createContext<CompoundContextGeneric>({});

export class Provider extends Component<any, CompoundContextStructure> {
  private subscription: Subscription | undefined;
  private trackers: Tracker[];
  private readonly queues: Set<string>;
  private readonly payload: {
    [p: string]: Level1Proxy<CompoundContextStructure>;
  };

  constructor(props: {}) {
    super(props);

    this.state = {
      // statistics
      click: 0,
      keypress: 0,
      // dimension
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // proxy related fields
    this.queues = new Set<string>();
    this.trackers = [];

    // private level1 proxy storage
    const store = new Map();
    const handlers: ProxyHandler<any> = {
      get: (_, identity: string) => {
        if (store.has(identity)) {
          return store.get(identity);
        } else {
          store.set(identity, this.createAccessStateProxy(identity));

          return store.get(identity);
        }
      },
    };

    // context wrapper
    this.payload = new Proxy({}, handlers);
  }

  createTracker(identity: string, accessKeys: string[], callback: () => void) {
    const tracker = (keys: string[]) => {
      keys.some((key) => {
        const match = accessKeys.includes(key);

        // tslint:disable-next-line:no-unused-expression
        match && callback();

        return match;
      });
    };

    tracker.identity = identity;

    return tracker as Tracker;
  }

  createAccessStateProxy(identity: string) {
    const cache: AccessStateProxyCache = {
      callback: () => {
        throw new Error('subscribe state callback function required');
      },
      accessKeys: [],
    };
    const subscribe = (render: () => void) => {
      // 添加订阅函数
      cache.callback = render;

      // reset empty keys
      cache.accessKeys = [];
    };
    // 更新 tracker
    const track = () => {
      this.trackers = this.trackers
        .filter((render) => render.identity !== identity)
        .concat(this.createTracker(identity, cache.accessKeys, cache.callback));
    };
    const accessStateProxyHandler: ProxyHandler<CompoundContextStructure> = {
      get: (_: any, property: string) => {
        // 记录 keys
        cache.accessKeys.push(property);

        // 返回原始值
        return Reflect.get(this.state, property);
      },
    };

    return {
      subscribe,
      track,
      // use this references directly, avoid target snapshot trap
      // @ts-ignore
      state: new Proxy({}, accessStateProxyHandler),
    };
  }

  componentDidMount() {
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

    this.subscription = merge(click$, keypress$, dimension$).subscribe(
      (action) => {
        this.setState((acc) => {
          Reflect.ownKeys(action)
            .filter((key) => Reflect.get(action, key) !== Reflect.get(acc, key))
            .forEach((key) => this.queues.add(key as string));

          return {
            ...acc,
            ...action,
          };
        });
      }
    );
  }

  shouldComponentUpdate() {
    const changedKeys = Array.from(this.queues);

    // 清空队列
    this.queues.clear();
    // 执行订阅回调
    this.trackers.forEach((tracker) => tracker(changedKeys));

    return false;
  }

  componentWillUnmount() {
    this.subscription!.unsubscribe();
  }

  render() {
    return (
      <CompoundContext.Provider value={this.payload}>
        {this.props.children}
      </CompoundContext.Provider>
    );
  }
}

export function useTrackContext() {
  const identity = useMemo(
    () =>
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9),
    []
  );
  const [, rerender] = useReducer((acc) => acc + 1, 0);
  const context = useContext(CompoundContext);
  const payload = context[identity];

  // 订阅更新
  payload.subscribe(rerender);

  // 记录依赖字段
  useEffect(() => {
    payload.track();
  });

  return payload.state;
}
