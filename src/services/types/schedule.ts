export interface IScheduleItemData {
  trainer: string;
  startTime: string;
  endTime: string;
  weekDay?: number
}

export interface ITrainer {
  name: string,
  id: number
}

export interface IScheduleCell {
  id: number;
  trainer: ITrainer;
  description: string;
  startTime: number;
  endTime: number;
  weekDay: number
}


export interface IScheduleData {
  monday: IScheduleItemData[];
  tuesday: IScheduleItemData[];
  wednesday: IScheduleItemData[];
  thursday: IScheduleItemData[];
  friday: IScheduleItemData[];
  saturday: IScheduleItemData[];
  sunday: IScheduleItemData[];
}
