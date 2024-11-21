"use client"

import React, { useState, useEffect } from "react";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { getResource } from "@/services/fetch";

import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

interface Transaction {
    total_transactions: number;
    total_items_sold: number;
    total_revenue: number;
}

const DashboardPage: React.FC = () => {
    const [transactionDetail, setTransactionDetail] = useState<Transaction | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const [year, month, day] = selectedDate.split("-");
                const data = await getResource<Transaction>(`dashboard-data?day=${day}&month=${month}&year=${year}`);

                setTransactionDetail(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setTransactionDetail(null);
            }
        };

        fetchTransactions();
    }, [selectedDate])

    const printPDF = async () => {
        const doc = new jsPDF();
        const content = document.querySelector("#dashboard-content");

        if (content) {
            const canvas = await html2canvas(content as HTMLElement, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
            doc.save("dashboard.pdf");
        }
    };

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

            <div id="dashboard-content" className="flex flex-col gap-1 ml-4 mr-4">
                <div className="flex gap-2">
                    <div className="bg-white shadow-lg rounded-lg p-4 w-full flex flex-col gap-1">
                        <span className="font-semibold">Transaksi</span>
                        <span>{transactionDetail?.total_transactions}</span>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4 w-full flex flex-col gap-1">
                        <span className="font-semibold">Produk Terjual</span>
                        <span>{transactionDetail?.total_items_sold}</span>
                    </div>
                </div>

                <div className="mt-4 bg-white p-4 rounded-lg flex flex-col gap-1 shadow-lg">
                    <span className="font-semibold">Total Pendapatan</span>
                    <span>Rp. {transactionDetail?.total_revenue}</span>
                </div>
            </div>

            <div className="fixed bottom-20 left-0 right-0 flex flex-col gap-3">
                <div className="pl-4 pr-4">
                    <button
                        onClick={printPDF}
                        className="bg-black rounded-lg p-3 w-full font-semibold text-white"
                    >
                        Cetak PDF
                    </button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default DashboardPage;
