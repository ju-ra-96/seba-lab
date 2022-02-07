type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  limit: number;
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}
