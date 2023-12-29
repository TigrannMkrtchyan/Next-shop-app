import { FailedMessages } from '@/utils/constants';
import ApiBase from '../base/apiBase';
import { APIResponseData, IPaginatedData, IProduct, ProductsCollection, UserData } from '../base/types';
import { API_BASE_URL } from '@/utils/environment';

class ProductService {
  private apiBase: ApiBase<any>;
  private token?: string;

  constructor(token?: string) {
    this.apiBase = new ApiBase<any>();
    this.token = token;
  }

  async getProduct(id: string): Promise<APIResponseData<IProduct>> {
    try {
      const response = await this.apiBase.getAsync(
        `${API_BASE_URL}/product/get-product/${id}`,
        this.token
      );

      if (!response.success) {
        return { message: response.error, success: false };
      }
      return response;
    } catch (error) {
      return { message: FailedMessages.issue, success: false };
    }
  }

  async getProductCollection(name: string): Promise<APIResponseData<ProductsCollection<IProduct>>> {
    try {
      const response = await this.apiBase.getAsync(
        `${API_BASE_URL}/product-collection/${name}`,
        this.token
      );

      if (!response.success) {
        return { message: response.error, success: false };
      }
      return response;
    } catch (error) {
      return { message: FailedMessages.issue, success: false };
    }
  }

  async getProducts(
    perPage: number,
    urlWithFilters?: string
  ): Promise<APIResponseData<IPaginatedData<IProduct[]>>> {
    try {
      let url = `${API_BASE_URL}/product/get-products?perPage=${perPage}`;
      if (urlWithFilters) {
        url += '&' + urlWithFilters;
      }
      const response = await this.apiBase.getAsync(url, this.token);
      if (!response.success) {
        return { message: response.error, success: false };
      }
      return response;
    } catch (error) {
      return { message: FailedMessages.issue, success: false };
    }
  }
}

export default ProductService;
