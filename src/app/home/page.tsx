"use client"

import { useState } from "react";
import Image from "next/image"

import { Input } from "@nextui-org/react";

import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col gap-1 text-black">
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

            <div className="flex flex-col gap-2 pl-4 pr-4">
                <div className="flex flex-col">
                    <div className="border-b pb-2">
                        <span className="font-semibold">Menu</span>
                    </div>

                    <div className="flex flex-col gap-2 mt-3 mb-3 border border-black rounded-lg p-3">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold">Sate Ayam</span>
                                    <span className="text-green-500 ">Rp. 20.000</span>
                                </div>
                            </div>

                            <div className="border border-black rounded-lg">
                                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                    <g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke="#0d0d0d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-3 mb-3 border border-black rounded-lg p-3">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold">Sate Ayam</span>
                                    <span className="text-green-500 ">Rp. 20.000</span>
                                </div>
                            </div>

                            <div className="border border-black rounded-lg">
                                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                    <g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke="#0d0d0d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default HomePage;
