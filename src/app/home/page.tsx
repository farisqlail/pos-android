"use client"

import { useState } from "react";

import { Input } from "@nextui-org/react";

import Navbar from "@/components/Navbar";

const SalesPage = () => {
    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col gap-3">
            <Navbar />

            <div className="w-full p-4">
                <Input type="email" variant="bordered" className="text-black" placeholder="cari makanan ..." startContent={
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1c1c1c">
                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                        <g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>
                    </svg>
                } />
            </div>

        </div>
    );
};

export default SalesPage;
