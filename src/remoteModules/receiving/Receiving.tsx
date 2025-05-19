import { Suspense, lazy } from "react";

const RemoteReceivingApp = lazy(() => import("receiving_app/App"));

const Receiving = () => {
  const fallbackLoading = (
    <div>
      <h2>Loading Receiving module</h2>
    </div>
  );

  return (
    <Suspense fallback={fallbackLoading}>
      <div className="px-5">
        <RemoteReceivingApp />
      </div>
    </Suspense>
  );
};

export default Receiving;
