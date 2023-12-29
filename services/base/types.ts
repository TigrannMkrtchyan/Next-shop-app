import {
  ValidProductColors,
  ValidProductSizes,
  ValidProductBrands,
  catalogType,
} from '@/utils/constants';

export type ID = number | string;

export interface ApiError {
  statusCode: number;
  errorMessage?: string;
}

export interface ApiHeaders {
  [key: string]: string;
}
export interface IApiBase<T> {
  getAllAsync: (url: string) => Promise<T[] | T | ApiError>;

  getAsync: (url: string, token?: string) => Promise<T | ApiError>;

  postAsync: (url: string, values: T) => Promise<T | ApiError>;

  putAsync: (
    id: ID,
    values: T,
    url: string,
    headers: any
  ) => Promise<T | ApiError>;

  putAllAsync(values: T, url: string): Promise<T | ApiError>;

  deleteAsync: (id: ID, url: string) => Promise<void | ApiError>;

  deleteAllAsync(values: T, url: string): Promise<T | ApiError>;
}

export interface APIResponse {
  message: string;
  success?: boolean;
}

export interface APIResponseData<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface IPaginatedData<T> {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: T;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface OrderData {
  name: string;
  telephone: string;
  address: string;
  city: string;
  country: string;
  province: string;
  postcode: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
}

export interface UserData {
  username: string;
  email: string;
}

export interface IPurchasedProducts {
  product: IProduct;
  count: number;
  size: string;
}

export interface IUserCardData {
  _id: string;
  purchasedProducts: IPurchasedProducts[];
}

export interface IAuthService {
  signup(signupData: SignupData): Promise<APIResponse>;
  signout(): Promise<APIResponse>;
  login(loginData: LoginData): Promise<APIResponse>;
}

export interface IOrderService {
  order(orderData: OrderData): Promise<APIResponse>
}

export interface ProductsCollection<T> {
  name: string;
  products: T[];
}

export interface IProduct {
  _id: string;
  name: string;
  type: catalogType;
  price: number;
  brand: ValidProductBrands | null;
  description: string | null;
  productsCollection: ProductsCollection<string>;
  sizes: ISizes[];
  images: string[];
  color: ValidProductColors;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface ISizes {
  size: ValidProductSizes;
  count: number;
}

export interface AddCardInput {
  product: string;
  count: number;
  size: string;
}

export interface IUserService {
  getOwnData(): Promise<APIResponseData<UserData>>;
  getCardData(): Promise<APIResponseData<IUserCardData>>;
  addToCard(data: AddCardInput): Promise<APIResponseData<undefined>>;
  removeFromCard(id: string, size: string): Promise<APIResponseData<undefined>>;
}

export interface IPaymentService {
  getConfig(): Promise<APIResponseData<string>>;
  getPaymentIntent(): Promise<APIResponseData<string>>;
}

export interface IProductService {
  getProduct(id: string): Promise<APIResponseData<IProduct>>;
  getProducts(
    perPage: number,
    urlWithFilters?: string
  ): Promise<APIResponseData<IPaginatedData<IProduct[]>>>;
  getProductCollection(
    name: string
  ): Promise<APIResponseData<ProductsCollection<IProduct>>>;
}
