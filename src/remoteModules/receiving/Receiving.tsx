import { ReceivingApp } from "./index";
import { Suspense } from "react";

const ReceivingWraper = () => {
  const fallbackLoading = (
    <div>
      <h2>Loading Receiving module</h2>
    </div>
  );

  return (
    <Suspense fallback={fallbackLoading}>
      <ReceivingApp />
    </Suspense>
  );
};

export default ReceivingWraper;
