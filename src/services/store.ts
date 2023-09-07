import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { teamSlice } from './slices/team-slice';
import { locationsSlice } from './slices/locations-slice';
import { userSlice } from './slices/user-slice';

export const rootReducer = combineReducers({
  team: teamSlice.reducer,
  locations: locationsSlice.reducer,
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});
