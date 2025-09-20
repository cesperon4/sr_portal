// app/verify-email/page.tsx (client)
"use client";
import { useEffect, useState } from "react";
import { useVerifyEmailMutation } from "../../../generated/graphql";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [verify] = useVerifyEmailMutation();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) {
      setStatus("no-token");
      return;
    }
    (async () => {
      try {
        await verify({ variables: { token } });
        setStatus("success");
        // optionally redirect after a few seconds:
        setTimeout(() => router.push("/login"), 2000);
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    })();
  }, [token]);

  return (
    <div className="p-8">
      {status === "loading" && <p>Verifying…</p>}
      {status === "success" && <p>Email verified! You can now log in.</p>}
      {status === "error" && (
        <>
          <p>Token invalid or expired.</p>
          {/* show resend form */}
        </>
      )}
    </div>
  );
}
