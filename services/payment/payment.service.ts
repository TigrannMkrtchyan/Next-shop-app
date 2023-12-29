import { FailedMessages } from '@/utils/constants';
import ApiBase from '../base/apiBase';
import {
  APIResponseData,
} from '../base/types';
import { API_BASE_URL } from '@/utils/environment';

class PaymentService {
  private apiBase: ApiBase<any>;
  private token?: string;

  constructor(token?: string) {
    this.apiBase = new ApiBase<any>();
    this.token = token;
  }

  async getConfig(): Promise<APIResponseData<string>> {
    try {
      const response = await this.apiBase.getAsync(
        `${API_BASE_URL}/payment/config`,
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

  async getPaymentIntent(): Promise<APIResponseData<string>> {
    try {
      const response = await this.apiBase.postAsync(
        `${API_BASE_URL}/payment/create-payment-intent`,
        {},
        { authorization: `Bearer ${this.token}` }
      );

      if (!response.success) {
        return { message: response.error, success: false };
      }
      return response;
    } catch (error) {
      return { message: FailedMessages.issue, success: false };
    }
  } 
}

export default PaymentService;
