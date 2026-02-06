"use client";

import { Button } from "@/components/ui/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CheckCircle2, Loader2, Lock, Shield, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setError(null);

      if (!stripe || !elements) {
        setError("Stripe is not loaded. Please refresh the page.");
        return;
      }

      setLoading(true);

      // Confirm payment
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || "Please check your payment details.");
        setLoading(false);
        return;
      }

      // Create payment intent confirmation
      const { error: confirmError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/payment-status`,
          },
          redirect: "if_required",
        });

      if (confirmError) {
        setError(confirmError.message || "Payment failed. Please try again.");
        setLoading(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setSuccess(true);
        setTimeout(() => {
          router.push("/payment-status?status=success");
        }, 2000);
      } else {
        setError("Payment processing failed. Please try again.");
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(
        err.message || "An unexpected error occurred. Please try again.",
      );
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 animate-in zoom-in-95 duration-300">
          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
          Your payment has been processed successfully. Redirecting...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Complete Payment
              </h1>
              <p className="text-blue-100 text-sm">
                Secure checkout powered by Stripe
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
              <Lock className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Secure</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2 duration-300">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <Shield className="w-4 h-4" />
                <span>Your payment information is encrypted and secure</span>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-neutral-800/50">
                <PaymentElement
                  options={{
                    layout: "tabs",
                    // @ts-ignore - Stripe types may be outdated
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#2563eb",
                        colorBackground: "transparent",
                        colorText: "rgb(17, 24, 39)",
                        colorDanger: "#ef4444",
                        fontFamily: "system-ui, sans-serif",
                        spacingUnit: "4px",
                        borderRadius: "8px",
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={!stripe || loading}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Pay Now
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Security Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>PCI DSS Compliant</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              <span>Powered by Stripe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 flex items-center justify-center gap-6 opacity-60">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          🔒 Secure Payment
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          ✓ Money-Back Guarantee
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          🛡️ Protected by Stripe
        </div>
      </div>
    </div>
  );
}
