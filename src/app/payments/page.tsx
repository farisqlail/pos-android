"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { postResource } from "@/services/fetch";

import NavbarPayment from "@/components/NavbarPayment";

interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

interface CheckoutItem {
    promo: number;
    subTotal: number;
    total: number;
    typetransaction: string;
}

const PaymentPage = () => {
    const router = useRouter();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [dataCheckout, setDataCheckout] = useState<CheckoutItem | null>(null);
    const [total, setTotal] = useState<string>("");
    const [userId, setUserid] = useState<string>("");
    const [payment, setPayment] = useState<number | string>("");
    const [change, setChange] = useState<number>(0);

    useEffect(() => {
        const dataCheckout = localStorage.getItem("dataCheckout");
        const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        const user = localStorage.getItem("user");

        if (dataCheckout) {
            const parsedData = JSON.parse(dataCheckout);
            setTotal(parsedData.total.toString());
            setDataCheckout(parsedData);
        }

        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                setUserid(parsedUser.id);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }

        const updatedCartData = cartData.map((item: CartItem) => ({
            ...item,
            id_menu: item.id,
        }));

        setCart(updatedCartData);
    }, []);

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPayment(value);

        const paymentValue = parseFloat(value);
        if (!isNaN(paymentValue)) {
            setChange(paymentValue - parseInt(total));
        } else {
            setChange(0); 
        }
    };

    const toRecipt = async () => {
        const dataTransaction = {
            menus: cart,
            user_id: userId,
            total: total,
            status_payment: "paid",
            status_transactions: "pending",
            discount_amount: dataCheckout?.promo,
            id_promo: 1,
            payment: "tunai",
            type_transaction: dataCheckout?.typetransaction,
            payAmount: payment
        }
        
        try {
            const data = await postResource("transactions/create", dataTransaction);

            if (data) {
                localStorage.setItem("dataTransaction", JSON.stringify(data.data));
                router.push("/receipt");
            } else {
                console.log("Ada yang salah");
            }
        } catch (error) {
            console.error("Error menambahkan menu:", error);
        }
    }

    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col gap-1 text-black">
            <NavbarPayment title="Pembayaran" route="/checkout" />

            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-center items-center ml-4 mr-4 mb-4">
                <span className="font-semibold text-lg">Total pembayaran</span>
                <span className="font-semibold text-lg">Rp. {total}</span>

                <div className="mt-4 flex items-center gap-3">
                    <label className="block mb-2">Dibayar</label>
                    <input
                        type="number"
                        value={payment}
                        onChange={handlePaymentChange}
                        className="border p-2 rounded w-full"
                        placeholder="Masukkan jumlah pembayaran"
                    />
                </div>
                <div className="mt-4">
                    <h2 className="text-xl">Kembalian: Rp. {change.toLocaleString()}</h2>
                </div>
            </div>

            <div className="flex flex-col pl-4 pr-4">
                <span className="font-semibold">Pilih Tipe Pembayaran</span>
                <div className="bg-white shadow-md rounded-lg mt-4 p-2 flex gap-2 items-center cursor-pointer" onClick={toRecipt}>
                    <div className="bg-violet-700 p-2 rounded-lg">
                        <svg fill="#ffffff" width="25px" height="25px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                            <g id="SVGRepo_iconCarrier"> <path d="M31,7H1A1,1,0,0,0,0,8V24a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V8A1,1,0,0,0,31,7ZM25.09,23H6.91A6,6,0,0,0,2,18.09V13.91A6,6,0,0,0,6.91,9H25.09A6,6,0,0,0,30,13.91v4.18A6,6,0,0,0,25.09,23ZM30,11.86A4,4,0,0,1,27.14,9H30ZM4.86,9A4,4,0,0,1,2,11.86V9ZM2,20.14A4,4,0,0,1,4.86,23H2ZM27.14,23A4,4,0,0,1,30,20.14V23Z" /> <path d="M7.51.71a1,1,0,0,0-.76-.1,1,1,0,0,0-.61.46l-2,3.43a1,1,0,0,0,1.74,1L7.38,2.94l5.07,2.93a1,1,0,0,0,1-1.74Z" /> <path d="M24.49,31.29a1,1,0,0,0,.5.14.78.78,0,0,0,.26,0,1,1,0,0,0,.61-.46l2-3.43a1,1,0,1,0-1.74-1l-1.48,2.56-5.07-2.93a1,1,0,0,0-1,1.74Z" /> <path d="M16,10a6,6,0,1,0,6,6A6,6,0,0,0,16,10Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,16,20Z" /> </g>
                        </svg>
                    </div>
                    <span className="font-normal">Tunai</span>
                </div>

            </div>
        </div>
    );
};

export default PaymentPage;
