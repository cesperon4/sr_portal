"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-950 dark:to-neutral-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Processing payment status...
          </p>
        </div>
      </div>
    );
  }

  const isSuccess = status === "success";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-950 dark:to-neutral-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className={`px-8 py-6 ${isSuccess ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-red-500 to-rose-600"}`}>
          <div className="flex items-center justify-center">
            {isSuccess ? (
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-in zoom-in-95 duration-300">
                <XCircle className="w-12 h-12 text-white" />
              </div>
            )}
          </div>
        </div>

        <div className="p-8 text-center">
          <h1 className={`text-3xl font-bold mb-2 ${isSuccess ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {isSuccess ? "Payment Successful!" : "Payment Failed"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {isSuccess
              ? "Your payment has been processed successfully. You will receive a confirmation email shortly."
              : "We couldn't process your payment. Please check your payment details and try again."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isSuccess ? (
              <>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Go to Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  Return Home
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => router.push("/checkout")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                >
                  Go to Dashboard
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
