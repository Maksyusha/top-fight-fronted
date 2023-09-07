export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}
