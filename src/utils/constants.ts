export enum catalogType {
  WOMEN = 'women',
  MEN = 'men',
  KID = 'kid',
}

export enum ValidProductSizes {
  S = 'S',
  M = 'M',
  L = 'L',
  X = 'X',
  XL = 'XL',
}

export enum ValidProductColors {
  RED = 'Red',
  BLUE = 'Blue',
  BLACK = 'Black',
  WHITE = 'White',
  PURPLE = 'Purple',
  PINK = 'Pink',
  GREEN = 'Green',
  BROWN = 'Brown',
}

export enum ValidProductBrands {
  NIKE = 'Nike',
  CONVERSE = 'Converse',
}

export const validProductSizes = Object.values(ValidProductSizes);
export const validProductColors = Object.values(ValidProductColors);
export const validProductBrands = Object.values(ValidProductBrands);

export const FailedMessages = {
  issue: 'Something went wrong!',
  userNameOrEmailMissing: 'Username or email address is required',
  passwordRequired: 'Password is required',
  EmailRequired: 'Email address is required',
  InvalidEmail: 'Please enter a valid email address',
  PasswordRequired: 'Password is required',
  InvalidPassword:
    'The password should be 8 characters in length, must contain at least one uppercase letter, number, and one special character',
  PasswordMismatch: 'Password doesn`t match. Please enter correct password',
  NameRequired: 'name is required',
  NameLength: 'Please enter a name with at least 3 and maximum 10 characters',
  TelephoneRequired: 'Telephone is required',
  AddressRequired: 'Address is required',
  CityRequired: 'City is required',
  CountryRequired: 'Country is required',
  ProvinceRequired: 'Province is required',
  PostcodeRequired: 'Postcode is required',
  DeliveryTypeRequired: 'Delivery type is required',
};

export const pagesUrls = {
  HOME: '/',
  CARD: '/card',
  WOMEN: '/women',
  MEN: '/men',
  KID: '/kid',
  ACCOUNT: '/account',
  LOGIN: '/account/login',
  REGISTER: '/account/register',
  CHECKOUT: '/checkout',
};
