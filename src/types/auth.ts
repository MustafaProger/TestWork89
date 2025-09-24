export type NeedData = {
  username: string;
  password: string;
  expiresInMins?: number;
};

export type AuthResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};
