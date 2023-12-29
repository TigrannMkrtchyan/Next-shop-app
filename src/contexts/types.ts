import { UserData } from '../../services/base/types';

export interface IClientCookiesProviderProps {
  children: React.ReactNode;
  token?: string;
}

export interface IUserContext {
  user: UserData | undefined;
  setUser: (data: UserData | undefined) => void;
  getUser: () => void;
}

export interface INotificationContext {
  openNotification: (title: string, description: string) => void;
}
