"use client"

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Unauthorizedpage = () => {
    const router = useRouter();

    const toHome = () => {
        router.push("/home")
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white w-full">
            <div className="font-semibold flex flex-col justify-center items-center bg-white shadow-md p-4 rounded-lg">
                <Image src="/images/unauthorized.png" width={250} height={250} alt="logo" priority />
                <p className="mt-2 text-black">Anda tidak memiliki akses di halaman ini</p>
            </div>


            <div className="fixed bottom-5 left-0 right-0 flex flex-col gap-3">
                <div className="pl-4 pr-4">
                    <button className="bg-black rounded-lg p-3 w-full font-semibold text-white" onClick={toHome}>Kembali</button>
                </div>
            </div>
        </div>
    );
};

export default Unauthorizedpage;
