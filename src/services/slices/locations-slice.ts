import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../types';
import { getLocationsRequestApi } from '../api';
import { ILocationData } from '../types/location';
import { IScheduleCell } from '../types/schedule';

export interface ILocation extends Omit<ILocationData, 'schedule'> {
  schedule: IScheduleCell[][];
}

interface ILocationState {
  locations: ILocation[];
  locationRequest: boolean;
  locationFailed: boolean;
}

const initialState: ILocationState = {
  locations: [],
  locationRequest: false,
  locationFailed: false,
};

const formatSchedule = (schedule: IScheduleCell[]) => {
  const array: IScheduleCell[][] = Array.from({ length: 7 }, () => []);

  schedule.sort((a, b) => a.startTime - b.startTime);

  for (const cell of schedule) {
    array[cell.weekDay].push(cell);
  }

  return array;
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    getLocationsRequest: state => {
      state.locationRequest = true;
    },
    getLocationsSuccess: (state, action: PayloadAction<{ locations: ILocationData[] }>) => {
      state.locationRequest = false;
      const newLocations = action.payload.locations.map(item => {
        const formattedSchedule = formatSchedule(item.schedule);
        const newItem = { ...item, schedule: formattedSchedule };
        return newItem;
      });
      state.locations = newLocations;
    },
    getLocationsFailed: state => {
      state.locationRequest = false;
      state.locationFailed = true;
    },
    pushLocation: (state, action: PayloadAction<{ location: ILocationData }>) => {
      const newLocation = { ...action.payload.location, schedule: formatSchedule(action.payload.location.schedule) };
      state.locations.push(newLocation);
    },
    changeLocation: (state, action: PayloadAction<{ location: ILocationData }>) => {
      const index = state.locations.findIndex(location => location.id === action.payload.location.id);
      const newLocation = { ...action.payload.location, schedule: formatSchedule(action.payload.location.schedule) };
      state.locations[index] = newLocation
    },
    deleteLocation: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.locations.findIndex(location => location.id === action.payload.id);
      state.locations.splice(index, 1);
    },
  },
});

export const { getLocationsRequest, getLocationsSuccess, getLocationsFailed, pushLocation, changeLocation, deleteLocation } =
  locationsSlice.actions;

export const getLocations = (): AppThunk => dispatch => {
  dispatch(getLocationsRequest());
  getLocationsRequestApi()
    .then(locations => dispatch(getLocationsSuccess({ locations })))
    .catch(() => getLocationsFailed());
};
