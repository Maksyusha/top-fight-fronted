import { IScheduleCell } from './schedule';

export interface ILocationData {
  id: number;
  name: string;
  address: string;
  map: string;
  schedule: IScheduleCell[];
  photoId: number;
  photo: string;
}
