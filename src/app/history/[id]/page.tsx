"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import { getResource } from "@/services/fetch";

import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

interface Menu {
    id: number;
    name: string;
    price: string;
    quantity: number;
    pivot: {
        transaction_id: number;
        menu_id: number;
        quantity: number;
        price: string;
    };
}

interface TransactionDetail {
    id: number;
    no_nota: string;
    grand_total: string;
    status_transaction: string;
    payment: string;
    discount_amount: string;
    created_at: string;
    menus: Array<Menu>;
}

const HistoryDetail: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [transactionDetail, setTransactionDetail] = useState<TransactionDetail | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);
            try {
                const data = await getResource<TransactionDetail>(`transactions/${params.id}`);
                setTransactionDetail(data);
                console.log("tt", data);

            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const toHistory = () => {
        router.push("/history")
    }

    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col gap-1 text-black">
            <Navbar />

            <div className="flex gap-2 ml-4 mb-4 items-center cursor-pointer" onClick={toHistory}>
                <svg fill="#000000" width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                    <g id="SVGRepo_iconCarrier"> <path d="M23.505 0c0.271 0 0.549 0.107 0.757 0.316 0.417 0.417 0.417 1.098 0 1.515l-14.258 14.264 14.050 14.050c0.417 0.417 0.417 1.098 0 1.515s-1.098 0.417-1.515 0l-14.807-14.807c-0.417-0.417-0.417-1.098 0-1.515l15.015-15.022c0.208-0.208 0.486-0.316 0.757-0.316z" /> </g>

                </svg>
                <span>Kembali</span>
            </div>

            <div className="ml-4 mr-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="mb-3">
                    <span className="font-semibold">Detail Transaksi</span>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col gap-1 w-[300px] max-w-[300px]">
                        <span className="text-gray-500">No Nota</span>
                        <span className="text-sm text-nowrap">{transactionDetail?.no_nota}</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-2">
                    <div className="flex flex-col gap-1 w-[300px] max-w-[300px]">
                        <span className="text-gray-500">Waktu</span>
                        <span className="text-sm">
                            {transactionDetail?.created_at
                                ? new Date(transactionDetail.created_at).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })
                                : ""}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 w-[300px] max-w-[300px]">
                        <span className="text-gray-500">Status</span>
                        <span className="text-sm">{transactionDetail?.status_transaction}</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-2">
                    <div className="flex flex-col gap-1 w-[300px] max-w-[300px]">
                        <span className="text-gray-500">Pembayaran</span>
                        <span className="text-sm">{transactionDetail?.payment}</span>
                    </div>
                    <div className="flex flex-col gap-1 w-[300px] max-w-[300px]">
                        <span className="text-gray-500">Diskon</span>
                        <span className="text-sm">Rp. {parseFloat(transactionDetail?.discount_amount || "0").toLocaleString("id-ID", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                </div>
            </div>

            <div className="ml-4 mr-4 bg-white p-4 rounded-lg shadow-lg mt-3">
                <div className="mb-3">
                    <span className="font-semibold">Detail Pesanan</span>
                </div>

                <div className="border-dashed border-b">
                    {transactionDetail?.menus && transactionDetail.menus.length > 0 ? (
                        transactionDetail.menus.map((menu) => (
                            <div key={menu.id} className="flex justify-between items-center mb-2 pb-2">
                                <div>
                                    <span className="font-semibold">{menu.name}</span>
                                    <div className="text-sm text-gray-500">
                                        Qty: {menu.pivot.quantity} | Harga: Rp. {parseInt(menu.price).toLocaleString("id-ID")}
                                    </div>
                                </div>
                                <div className="font-semibold text-gray-800">
                                    Rp. {(parseInt(menu.price) * menu.pivot.quantity).toLocaleString("id-ID")}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Tidak ada detail menu.</p>
                    )}
                </div>

                <div className="flex justify-between border-dashed border-b pb-2 pt-2">
                    <span>Discount</span>
                    <span className="text-red-500">Rp. - {parseFloat(transactionDetail?.discount_amount || "0").toLocaleString("id-ID", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                </div>

                <div className="flex justify-between mt-2">
                    <span className="text-lg">Total Tagihan</span>
                    <span className="text-lg">  Rp. {parseFloat(transactionDetail?.grand_total || "0").toLocaleString("id-ID", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                </div>

            </div>

            <BottomNav />
        </div>
    );
};

export default HistoryDetail;
