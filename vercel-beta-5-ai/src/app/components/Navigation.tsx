"use client";

import { signOut } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function Navigation() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSignOut() {
    startTransition(async () => {
      await signOut();
      router.push("/signin");
    });
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gray-900 text-white flex items-center justify-between px-8 shadow z-50">
      <div className="text-xl font-bold">My App</div>
      <button
        onClick={handleSignOut}
        className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition-colors text-sm font-medium disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Signing out..." : "Sign Out"}
      </button>
    </nav>
  );
}
