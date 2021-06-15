import { IPoint } from './models';
import {
  take,
  takeLast,
} from 'rambda';


export const processData = (data: any): IPoint[] => {
  return data.map((item: any) => {
    const dateString = item.date.toString().split('');
    const timeString = item.time.toString().split('');

    const year = +take(4, dateString).join('');
    const month = +take(2, takeLast(4, dateString)).join('');
    const day = +takeLast(2, dateString).join('');

    const hours = +take(2, timeString).join('');

    return {
      date: new Date(year, month, day, hours),
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    };
  });
};