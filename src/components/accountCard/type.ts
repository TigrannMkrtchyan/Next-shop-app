import { IPurchasedProducts } from '../../../services/base/types';

export interface AccountCardProps {
  products: IPurchasedProducts[];
  handleDelete: (id: string, size: string) => void;
}
