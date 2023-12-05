export type AppUser = {
  id: number;
  name: string;
  weight: number;
  dob: string;
  goal: string;
  height: number;
  gender: string;
  pal: string;
  wpa: number;
  image: string[];
  email: string;
};

export type RegisterRequest = {
  name: string;
  weight: number;
  dob: string;
  goal: string;
  height: number;
  gender: string;
  pal: string;
  wpa: number;
  email: string;
  password: string;
  image?: string[];
  googleIDToken?: string;
};

export type AuthenticateRequest = {
  email: string;
  password: string;
  googleIDToken?: string;
};

export enum fieldErrorEnum {
  NAME,
  DOB,
  HEIGHT,
  WEIGHT,
  GENDER,
  GOAL,
  PAL,
  WPA,
  EMAIL,
  PASSWORD,
}