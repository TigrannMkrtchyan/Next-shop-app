import { FailedMessages } from '@/utils/constants';
import ApiBase from '../base/apiBase';
import {
  APIResponseData,
  AddCardInput,
  IUserCardData,
  UserData,
} from '../base/types';
import { API_BASE_URL } from '@/utils/environment';

class UserService {
  private apiBase: ApiBase<any>;
  private token?: string;

  constructor(token?: string) {
    this.apiBase = new ApiBase<any>();
    this.token = token;
  }

  async getOwnData(): Promise<APIResponseData<UserData>> {
    try {
      const response = await this.apiBase.getAsync(
        `${API_BASE_URL}/user/getOwnData`,
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

  async getCardData(): Promise<APIResponseData<IUserCardData>> {
    try {
      const response = await this.apiBase.getAsync(
        `${API_BASE_URL}/user/getCardData`,
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

  async addToCard(data: AddCardInput): Promise<APIResponseData<undefined>> {
    try {
      const response = await this.apiBase.postAsync(
        `${API_BASE_URL}/user/addToCard`,
        data,
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

  async removeFromCard(
    id: string,
    size: string
  ): Promise<APIResponseData<undefined>> {
    try {
      const response = await this.apiBase.putAllAsync(
        { id, size },
        `${API_BASE_URL}/user/removeFromCard`,
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

export default UserService;
