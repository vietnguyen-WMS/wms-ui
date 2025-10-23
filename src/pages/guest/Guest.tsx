import useAsync from '@/hooks/useAsync';
import api from '@/services/api';
import { Button } from '@/components/ui';

const fetchProducts = () =>
  api.get('https://dummyjson.com/products/1', { withCredentials: false });

const Guest = () => {
  const { execute, data, isLoading, error } = useAsync(fetchProducts);

  return (
    <>
      <div className="pt-3">
        <Button onClick={execute}>Fetch Product</Button>
      </div>
      <div className="block">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {data && <pre>{JSON.stringify(data.data, null, 2)}</pre>}
      </div>
    </>
  );
};

export default Guest;
