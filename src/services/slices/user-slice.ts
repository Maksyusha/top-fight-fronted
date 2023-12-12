import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginRequest, ITokenResponse } from '../types/login';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { AppThunk } from '../types';
import { getLogoutRequestApi, getUserRequestApi, postLoginRequestApi } from '../api';
import { IUserData } from '../types/user';

interface IUserState {
  isAuthChecked: boolean;
  user: IUserData | null;
  userRequest: boolean;
  userFailed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
}

const initialState: IUserState = {
  isAuthChecked: false,
  user: null,
  userRequest: false,
  userFailed: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest(state) {
      state.userRequest = true;
    },
    getUserFailed(state) {
      state.isAuthChecked = false;
      state.userRequest = false;
      state.userFailed = true;
    },
    getUserSuccess(state, action: PayloadAction<IUserData>) {
      state.isAuthChecked = true;
      state.user = action.payload;
      state.userRequest = false;
      state.userFailed = false;
    },
    postLoginRequest(state) {
      state.isAuthChecked = false;
      state.loginRequest = true;
    },
    postLoginFailed(state) {
      state.loginRequest = false;
      state.loginFailed = true;
    },
    postLoginSuccess(state, action: PayloadAction<ITokenResponse>) {
      setCookie('accessToken', action.payload.accessToken);
      setCookie('refreshToken', action.payload.refreshToken);
      state.isAuthChecked = true;
      state.loginRequest = false;
      state.loginFailed = false;
    },
    getLogoutRequest(state) {
      state.logoutRequest = true;
    },
    getLogoutSuccess(state) {
      state.isAuthChecked = false;
      state.user = null;
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      state.userRequest = false;
      state.userFailed = false;
    },
    getLogoutFailed(state) {
      state.isAuthChecked = false;
      state.user = null;
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      state.userRequest = false;
      state.logoutFailed = true;
    },
  },
});

const {
  getUserRequest,
  getUserFailed,
  getUserSuccess,
  postLoginRequest,
  postLoginFailed,
  postLoginSuccess,
  getLogoutRequest,
  getLogoutFailed,
  getLogoutSuccess,
} = userSlice.actions;

export const sendLogin =
  (loginData: ILoginRequest): AppThunk =>
  dispatch => {
    dispatch(postLoginRequest());
    postLoginRequestApi(loginData)
      .then(tokens => {
        dispatch(postLoginSuccess(tokens));
      })
      .catch(() => dispatch(postLoginFailed()));
  };

export const getUser = (): AppThunk => dispatch => {
  dispatch(getUserRequest());
  getUserRequestApi()
    .then(user => {
      dispatch(getUserSuccess(user));
    })
    .catch(() => dispatch(getUserFailed()));
};

export const getLogout = (): AppThunk => dispatch => {
  dispatch(getLogoutRequest());
  getLogoutRequestApi()
    .then(() => dispatch(getLogoutSuccess()))
    .catch(() => dispatch(getLogoutFailed()));
};
