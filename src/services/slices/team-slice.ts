import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPersonData } from '../types/team';
import { AppThunk } from '../types';
import { getTeamRequestApi } from '../api';

interface ITeamState {
  team: IPersonData[];
  teamRequest: boolean;
  teamFailed: boolean;
}

const initialState: ITeamState = {
  team: [],
  teamRequest: false,
  teamFailed: false,
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    getTeamRequest: state => {
      state.teamRequest = true;
    },
    getTeamSuccess: (state, action: PayloadAction<{ team: IPersonData[] }>) => {
      state.teamRequest = false;
      state.team = action.payload.team;
    },
    getTeamFailed: state => {
      state.teamRequest = false;
      state.teamFailed = true;
    },
    pushPerson: (state, action: PayloadAction<{ person: IPersonData }>) => {
      state.team.push(action.payload.person);
    },
    changePerson: (state, action: PayloadAction<{ person: IPersonData }>) => {
      const index = state.team.findIndex(person => person.id === action.payload.person.id);
      state.team[index] = action.payload.person;
    },
    deletePerson: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.team.findIndex(person => person.id === action.payload.id);
      state.team.splice(index, 1);
    },
  },
});

export const { getTeamRequest, getTeamSuccess, getTeamFailed, pushPerson, changePerson, deletePerson } = teamSlice.actions;

export const getTeam = (): AppThunk => dispatch => {
  dispatch(getTeamRequest());
  getTeamRequestApi()
    .then(team => dispatch(getTeamSuccess({ team })))
    .catch(() => getTeamFailed());
};
