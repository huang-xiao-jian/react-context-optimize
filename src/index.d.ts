declare module '*.pcss';

// interfaces
interface Statistic {
  click: number;
  keypress: number;
}

interface Dimension {
  width: number;
  height: number;
}

type CompoundContextStructure = Statistic & Dimension;

type Selector = (
  structure: CompoundContextStructure
) => Partial<CompoundContextStructure>;
type Comparer = (prev: any, curr: any) => boolean;
