import { FailedMessages } from '@/utils/constants';
import ApiBase from '../base/apiBase';
import { APIResponse, OrderData } from '../base/types';
import { API_BASE_URL } from '@/utils/environment';

class OrderService {
  private apiBase: ApiBase<any>;
  private token?: string;

  constructor(token?: string) {
    this.apiBase = new ApiBase<any>();
    this.token = token;
  }

  async order(orderData: OrderData): Promise<APIResponse> {
    try {
      const response = await this.apiBase.postAsync(
        `${API_BASE_URL}/order/add-order`,
        orderData,
        { authorization: `Bearer ${this.token}` }
      );

      if (!response.success) {
        return {
          message: response.error || response.errorMessage,
          success: false,
        };
      }

      return { message: response.message, success: true };
    } catch (error) {
      console.log(error);
      return { message: FailedMessages.issue, success: false };
    }
  }
}

export default OrderService;
