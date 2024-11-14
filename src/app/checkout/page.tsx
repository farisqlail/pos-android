"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import NavbarPayment from "@/components/NavbarPayment";

interface CartItem {
    name: string;
    quantity: number;
}

const CheckoutPage = () => {
    const router = useRouter();
    const [cart, setCart] = useState<CartItem[]>([]);

    const getCartData = () => {
        const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(cartData);
    };

    useEffect(() => {
        getCartData();
        const interval = setInterval(getCartData, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleRemoveFromCart = (index: number) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const toPayment = () => {
        router.push("/payments")
    }

    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col gap-1 text-black">
            <NavbarPayment title="Checkout" route="/home" />

            <span className="font-semibold pl-4">Pakai Promo</span>
            <div className="pl-4 pt-2 pr-2 flex gap-2 overflow-x-auto whitespace-nowrap">
                <div className="p-3 border border-black flex gap-2 items-center rounded-lg">
                    <span className="font-semibold">Promo saber kilat 50%</span>
                    <button className="bg-orange-400 p-2 rounded-lg text-white
                    ">Pakai</button>
                </div>
                <div className="p-3 border border-black flex gap-2 items-center rounded-lg">
                    <span className="font-semibold">Promo saber kilat 50%</span>
                    <button className="bg-orange-400 p-2 rounded-lg text-white
                    ">Pakai</button>
                </div>
            </div>

            <div className="bg-white shadow-md ml-4 mr-4 rounded-lg mt-4 pt-4">
                <span className="pl-4 font-semibold">Item Checkout</span>
                <div className="flex flex-col pl-4 pr-4 pt-2">
                    {cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div key={index} className="border-b pb-3 text-black cursor-pointer flex justify-between items-center">
                                <div className="flex gap-2">
                                    <span className="font-normal">{item.name}</span> |
                                    <span>{item.quantity}</span>
                                </div>

                                <div
                                    className="border rounded-full p-1 border-[#e60000] cursor-pointer"
                                    onClick={() => handleRemoveFromCart(index)}
                                >
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4" stroke="#e60000" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M20.5 6H3.49988" stroke="#e60000" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#e60000" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M9.5 11L10 16" stroke="#e60000" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M14.5 11L14 16" stroke="#e60000" stroke-width="1.5" stroke-linecap="round" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-black">Keranjang kosong</p>
                    )}
                </div>
            </div>

            <div className="fixed bottom-5 left-0 right-0 flex flex-col gap-3">
                <div className="bg-white shadow-md ml-4 mr-4 p-4 rounded-lg mt-4 flex flex-col gap-2">
                    <span className="font-semibold">Total Belanja</span>
                    <div className="flex justify-between">
                        <span>Sub total</span>
                        <span>Rp. 20.000</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Promo</span>
                        <span className="text-red-500">- Rp. 10.000</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Grand total</span>
                        <span className="font-semibold">Rp. 10.000</span>
                    </div>
                </div>

                <div className="pl-4 pr-4">
                    <button className="bg-black rounded-lg p-3 w-full font-semibold text-white" onClick={toPayment}>Bayar</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
