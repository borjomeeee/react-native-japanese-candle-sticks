export interface IPoint {
  date: number;
  low: number;
  open: number;
  high: number;
  close: number;
}

export interface IChartPoint extends IPoint {
  maxChartY: number;
}
