"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/auth");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <div className="text-white text-3xl font-semibold">
        <h1>Welcome to My App!</h1>
        <p className="mt-2">Loading...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
