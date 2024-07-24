"use client";

import UpdateComponent from "_/components/UpdatePrompt";
import { Suspense } from "react";

const EditPrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateComponent />
    </Suspense>
  );
};

export default EditPrompt;
