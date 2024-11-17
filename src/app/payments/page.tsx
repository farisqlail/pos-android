"use client"

import React from "react";
import { useRouter } from "next/navigation";

import NavbarPayment from "@/components/NavbarPayment";

// interface CartItem {
//     name: string;
//     quantity: number;
// }

const PaymentPage = () => {
    const router = useRouter();
    // const [cart, setCart] = useState<CartItem[]>([]);

    // const getCartData = () => {
    //     const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    //     setCart(cartData);
    // };

    const toRecipt = () => {
        router.push("/receipt");
    }

    const toQris = () => {
        router.push("/qris")
    }

    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col gap-1 text-black">
            <NavbarPayment title="Pembayaran" route="/checkout" />

            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-center items-center ml-4 mr-4 mb-4">
                <span className="font-semibold text-lg">Total pembayaran</span>
                <span className="font-semibold text-lg">Rp. 10.000</span>
            </div>

            <div className="flex flex-col pl-4 pr-4">
                <span className="font-semibold">Pilih Tipe Pembayaran</span>
                <div className="bg-white shadow-md rounded-lg mt-4 p-2 flex gap-2 items-center cursor-pointer" onClick={toRecipt}>
                    <div className="bg-violet-700 p-2 rounded-lg">
                        <svg fill="#ffffff" width="25px" height="25px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                            <g id="SVGRepo_iconCarrier"> <path d="M31,7H1A1,1,0,0,0,0,8V24a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V8A1,1,0,0,0,31,7ZM25.09,23H6.91A6,6,0,0,0,2,18.09V13.91A6,6,0,0,0,6.91,9H25.09A6,6,0,0,0,30,13.91v4.18A6,6,0,0,0,25.09,23ZM30,11.86A4,4,0,0,1,27.14,9H30ZM4.86,9A4,4,0,0,1,2,11.86V9ZM2,20.14A4,4,0,0,1,4.86,23H2ZM27.14,23A4,4,0,0,1,30,20.14V23Z" /> <path d="M7.51.71a1,1,0,0,0-.76-.1,1,1,0,0,0-.61.46l-2,3.43a1,1,0,0,0,1.74,1L7.38,2.94l5.07,2.93a1,1,0,0,0,1-1.74Z" /> <path d="M24.49,31.29a1,1,0,0,0,.5.14.78.78,0,0,0,.26,0,1,1,0,0,0,.61-.46l2-3.43a1,1,0,1,0-1.74-1l-1.48,2.56-5.07-2.93a1,1,0,0,0-1,1.74Z" /> <path d="M16,10a6,6,0,1,0,6,6A6,6,0,0,0,16,10Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,16,20Z" /> </g>
                        </svg>
                    </div>
                    <span className="font-normal">Tunai</span>
                </div>
                <div className="bg-white shadow-md rounded-lg mt-4 p-2 flex gap-2 items-center cursor-pointer" onClick={toQris}>
                    <div className="bg-red-700 p-2 rounded-lg">
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0" />

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                            <g id="SVGRepo_iconCarrier"> <path opacity="0.1" d="M15 6C15 5.06812 15 4.60218 15.1522 4.23463C15.3552 3.74458 15.7446 3.35523 16.2346 3.15224C16.6022 3 17.0681 3 18 3C18.9319 3 19.3978 3 19.7654 3.15224C20.2554 3.35523 20.6448 3.74458 20.8478 4.23463C21 4.60218 21 5.06812 21 6C21 6.93188 21 7.39782 20.8478 7.76537C20.6448 8.25542 20.2554 8.64477 19.7654 8.84776C19.3978 9 18.9319 9 18 9C17.0681 9 16.6022 9 16.2346 8.84776C15.7446 8.64477 15.3552 8.25542 15.1522 7.76537C15 7.39782 15 6.93188 15 6Z" fill="#ffffff" /> <path opacity="0.1" d="M3 6C3 5.06812 3 4.60218 3.15224 4.23463C3.35523 3.74458 3.74458 3.35523 4.23463 3.15224C4.60218 3 5.06812 3 6 3C6.93188 3 7.39782 3 7.76537 3.15224C8.25542 3.35523 8.64477 3.74458 8.84776 4.23463C9 4.60218 9 5.06812 9 6C9 6.93188 9 7.39782 8.84776 7.76537C8.64477 8.25542 8.25542 8.64477 7.76537 8.84776C7.39782 9 6.93188 9 6 9C5.06812 9 4.60218 9 4.23463 8.84776C3.74458 8.64477 3.35523 8.25542 3.15224 7.76537C3 7.39782 3 6.93188 3 6Z" fill="#ffffff" /> <path opacity="0.1" d="M3 18C3 17.0681 3 16.6022 3.15224 16.2346C3.35523 15.7446 3.74458 15.3552 4.23463 15.1522C4.60218 15 5.06812 15 6 15C6.93188 15 7.39782 15 7.76537 15.1522C8.25542 15.3552 8.64477 15.7446 8.84776 16.2346C9 16.6022 9 17.0681 9 18C9 18.9319 9 19.3978 8.84776 19.7654C8.64477 20.2554 8.25542 20.6448 7.76537 20.8478C7.39782 21 6.93188 21 6 21C5.06812 21 4.60218 21 4.23463 20.8478C3.74458 20.6448 3.35523 20.2554 3.15224 19.7654C3 19.3978 3 18.9319 3 18Z" fill="#ffffff" /> <path d="M15 6C15 5.06812 15 4.60218 15.1522 4.23463C15.3552 3.74458 15.7446 3.35523 16.2346 3.15224C16.6022 3 17.0681 3 18 3C18.9319 3 19.3978 3 19.7654 3.15224C20.2554 3.35523 20.6448 3.74458 20.8478 4.23463C21 4.60218 21 5.06812 21 6C21 6.93188 21 7.39782 20.8478 7.76537C20.6448 8.25542 20.2554 8.64477 19.7654 8.84776C19.3978 9 18.9319 9 18 9C17.0681 9 16.6022 9 16.2346 8.84776C15.7446 8.64477 15.3552 8.25542 15.1522 7.76537C15 7.39782 15 6.93188 15 6Z" stroke="#ffffff" stroke-width="2" stroke-linejoin="round" /> <path d="M3 6C3 5.06812 3 4.60218 3.15224 4.23463C3.35523 3.74458 3.74458 3.35523 4.23463 3.15224C4.60218 3 5.06812 3 6 3C6.93188 3 7.39782 3 7.76537 3.15224C8.25542 3.35523 8.64477 3.74458 8.84776 4.23463C9 4.60218 9 5.06812 9 6C9 6.93188 9 7.39782 8.84776 7.76537C8.64477 8.25542 8.25542 8.64477 7.76537 8.84776C7.39782 9 6.93188 9 6 9C5.06812 9 4.60218 9 4.23463 8.84776C3.74458 8.64477 3.35523 8.25542 3.15224 7.76537C3 7.39782 3 6.93188 3 6Z" stroke="#ffffff" stroke-width="2" stroke-linejoin="round" /> <path d="M3 18C3 17.0681 3 16.6022 3.15224 16.2346C3.35523 15.7446 3.74458 15.3552 4.23463 15.1522C4.60218 15 5.06812 15 6 15C6.93188 15 7.39782 15 7.76537 15.1522C8.25542 15.3552 8.64477 15.7446 8.84776 16.2346C9 16.6022 9 17.0681 9 18C9 18.9319 9 19.3978 8.84776 19.7654C8.64477 20.2554 8.25542 20.6448 7.76537 20.8478C7.39782 21 6.93188 21 6 21C5.06812 21 4.60218 21 4.23463 20.8478C3.74458 20.6448 3.35523 20.2554 3.15224 19.7654C3 19.3978 3 18.9319 3 18Z" stroke="#ffffff" stroke-width="2" stroke-linejoin="round" /> <path d="M12 3V6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M18 18H15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M21 15H18" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M9 12L3 12" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M21 12L13 12V12C12.4477 12 12 11.5523 12 11V11L12 9" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M14.5 21L20 21V21C20.5523 21 21 20.5523 21 20V20L21 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M12 21L12 16.2L12 16C12 15.4477 12.4477 15 13 15V15L15 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>
                        </svg>
                    </div>
                    <span className="font-normal">Qris</span>
                </div>

            </div>
        </div>
    );
};

export default PaymentPage;
