import { PricingTable } from "@clerk/nextjs";

export default function Pricing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold">Pricing</h1>
      <div>
        <PricingTable />
      </div>
    </div>
  );
}
