import { PricingTable } from '@clerk/nextjs';
import { dark } from '@clerk/themes'

export default function Pricing() {
  return (
    <section className='flex flex-col w-full justify-center items-center p-10 min-h-screen' >
      <div className='max-w-[90ch]'>
      <PricingTable
        appearance={{
          baseTheme: dark,
          
        }}
        fallback={<div className="text-center py-8">Cargando precios...</div>}
        newSubscriptionRedirectUrl="/dashboard"
      />
      </div>
    </section>
  );
}
