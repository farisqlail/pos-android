"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth");
  }, [router]);

  return (
    <div>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
    </div>
  );
};

export default IndexPage;
