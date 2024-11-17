"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth"); 
  }, [router]);

  return null; 
};

export default IndexPage;
