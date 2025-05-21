import { Suspense, lazy } from "react";

const RemoteReceivingApp = lazy(() => import("receiving/App"));

const Receiving = () => {
  const fallbackLoading = (
    <div>
      <h2>Loading Receiving module</h2>
    </div>
  );

  return (
    <Suspense fallback={fallbackLoading}>
      <RemoteReceivingApp />
    </Suspense>
  );
};

export default Receiving;
