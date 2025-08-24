import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { useAuth } from './stores';
import { useEffect } from 'react';
import { ToastContainer } from '@components/ui/Toast';

function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
