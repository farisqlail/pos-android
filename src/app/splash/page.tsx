"use client"

import { useEffect } from "react";
import Image from "next/image"
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
    <div className="flex justify-center items-center min-h-screen bg-white w-full">
      <div className="text-white text-3xl font-semibold flex flex-col justify-center items-center">
        <Image src="/icons/logo.png" width={100} height={100} alt="logo" priority />
        <p className="mt-2 text-black">Selamat Datang</p>
      </div>
    </div>
  );
};

export default SplashScreen;
