"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth");
  }, [router]);

  useEffect(() => {
    // Mencegah zoom dengan event listener
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Menangani zoom melalui keyboard atau gesture
    const preventKeyboardZoom = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === "+" || e.key === "-")) || // Ctrl + Zoom
        e.key === "Meta" // Command Key
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventZoom, { passive: false });
    document.addEventListener("keydown", preventKeyboardZoom);

    return () => {
      document.removeEventListener("touchmove", preventZoom);
      document.removeEventListener("keydown", preventKeyboardZoom);
    };
  }, []);

  return (
    <div>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1"
        />
      </Head>
    </div>
  );
};

export default IndexPage;
