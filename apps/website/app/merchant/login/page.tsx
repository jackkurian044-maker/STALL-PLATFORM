"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MerchantLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Replace with actual merchant auth flow.
    console.log("Merchant login", { email, password });
    router.push("/merchant/dashboard");
  };

  return (
    <main className="container py-8">
      <section style={{ maxWidth: 560, margin: "0 auto" }}>
        <h1 className="text-3xl font-bold mb-4">Merchant Login</h1>
        <p className="mb-6 text-sm text-slate-600">
          Sign in to manage your business listings, update services, and view customer requests.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="merchant@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Enter your password"
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
