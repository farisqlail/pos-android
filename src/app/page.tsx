"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/splash"); 
  }, [router]);

  return null; 
};

export default IndexPage;
