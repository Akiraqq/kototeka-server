export interface IUser {
  id: string;
  email: string;
}

export type JwtPayload = {
  email: string;
  sub: string;
};

export type UserAuthData = {
  access_token: string;
  user_data: IUser;
};
