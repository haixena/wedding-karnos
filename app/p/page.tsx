import { Suspense } from "react";
import WomanWeddingInvitation from "./_components/woman-component";

export default function Home() {
  return (
    <Suspense>
      <WomanWeddingInvitation />
    </Suspense>
  );
}
