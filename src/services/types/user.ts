export interface IUserData {
  username: string;
  password?: string
  role: 'user' | 'admin';
}
