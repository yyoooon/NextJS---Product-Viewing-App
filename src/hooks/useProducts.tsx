import { useQuery } from 'react-query';
import { Product } from '@/types';
import { getProducts } from '@/api/product';

type UseProductsArgs = {
  page: number;
  contentsLength?: number;
  onError?: (error: any) => void;
};

const useProducts = ({ page, contentsLength = 10 }: UseProductsArgs) => {
  const { isLoading, error, data } = useQuery<unknown, unknown, Product[]>(
    ['product', page],
    async () => {
      if (!page) return [];
      const { data } = await getProducts(page, contentsLength);
      const { products } = data.data;
      return products;
    },
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { isLoading, error, data };
};

export default useProducts;
