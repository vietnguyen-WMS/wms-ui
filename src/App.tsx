import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useAuth } from "./stores";
import { useEffect } from "react";

function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
