"use client";

import CheckoutForm from "@/components/stripe/checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useCreatePaymentIntentMutation } from "../../../generated/graphql";

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );

  useEffect(() => {
    const createIntent = async () => {
      try {
        await createPaymentIntent({
          variables: {
            data: { type: "subscription", billingCycle: "monthly" },
          },
          onCompleted: (data) => {
            console.log("create intent complete: ", data);

            setClientSecret(
              data?.createPaymentIntent?.data?.clientSecret ?? null,
            );
          },
        });
      } catch (err) {
        console.log("error create intent: ", err);
      }
    };

    createIntent();
  }, []);
  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
