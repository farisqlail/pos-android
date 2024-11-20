"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { getResource } from "@/services/fetch";

import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

interface Transaction {
    id: number;
    no_nota: string;
    grand_total: string;
    status_transaction: string;
}

const HistoryPage: React.FC = () => {
    const router = useRouter();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);
            try {
                const [year, month, day] = selectedDate.split("-");
                const data = await getResource<Transaction[]>(`transactions?day=${day}&month=${month}&year=${year}`);
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setTransactions([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, [selectedDate]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col gap-1 text-black">
            <Navbar />

            <div className="w-full p-4">
                <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700">
                    Pilih Tanggal
                </label>
                <input
                    id="date-picker"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="mt-1 block w-full p-2 rounded-md border border-black shadow-sm sm:text-sm"
                    max={new Date().toISOString().split("T")[0]}
                />
            </div>

            <div className="flex flex-col gap-3 ml-4 mr-4 mb-[100px]">
                {isLoading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="p-3 shadow-lg rounded-lg bg-gray-300 animate-pulse h-24"
                            ></div>
                        ))}
                    </div>
                ) : transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <Link href={`/history/${transaction.no_nota}`} key={transaction.no_nota}>
                            <div className="p-3 shadow-lg rounded-lg hover:bg-gray-100 cursor-pointer">
                                <div className="flex justify-between items-center">
                                    <span>{transaction.no_nota}</span>
                                    <span
                                        className={`rounded-full pl-3 pr-3 pt-[1px] pb-[1px] text-white ${transaction.status_transaction === "completed"
                                            ? "bg-green-600"
                                            : "bg-yellow-600"
                                            }`}
                                    >
                                        {transaction.status_transaction}
                                    </span>
                                </div>

                                <div className="mt-3">
                                    <span className="font-semibold text-lg">
                                        Rp. {parseInt(transaction.grand_total).toLocaleString("id-ID")}
                                    </span>
                                </div>
                            </div>
                        </Link>

                    ))
                ) : (
                    <p className="text-center text-gray-500">Tidak ada transaksi.</p>
                )}
            </div>

            <BottomNav />
        </div>
    );
};

export default HistoryPage;
