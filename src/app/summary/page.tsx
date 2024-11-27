"use client";

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
    top_selling_product: string;
    top_promotion: string;
    payment_method_revenue: {
        tunai: number;
        qris: number;
    }
}

const SummaryPage: React.FC = () => {
    const [transactionDetail, setTransactionDetail] = useState<Transaction | null>(null);
    const [startDate, ] = useState<string>(() => {
        const today = new Date();
        today.setDate(today.getDate() - 7);
        return today.toISOString().split("T")[0];
    });

    const [endDate, ] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getResource<Transaction>(
                    `dashboard-data?start_date=${startDate}&end_date=${endDate}`
                );
                setTransactionDetail(data);
            } catch (err) {
                console.error("Error fetching transactions:", err);
                setError("Gagal mengambil data transaksi.");
                setTransactionDetail(null);
            } finally {
                setLoading(false);
            }
        };

        if (new Date(startDate) > new Date(endDate)) {
            setError("Tanggal awal tidak boleh lebih besar dari tanggal akhir.");
            setTransactionDetail(null);
            return;
        }

        fetchTransactions();
    }, [startDate, endDate]);

    const printPDF = async () => {
        setLoading(true);
        const doc = new jsPDF();
        const content = document.querySelector("#dashboard-content");

        if (content) {
            const originalClass = content.className;
            content.className = originalClass.replace("hidden", "block");

            try {
                const canvas = await html2canvas(content as HTMLElement, { scale: 2 });
                const imgData = canvas.toDataURL("image/png");
                const imgWidth = 190;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
                doc.save(`Rekap data-${startDate}-${endDate}.pdf`);
            } catch (error) {
                console.error("Error while generating PDF:", error);
            } finally {
                content.className = originalClass;
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col gap-1 text-black">
            <Navbar />

            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="text-white text-lg font-semibold">Sedang memproses, harap tunggu...</div>
                </div>
            )}

            <h1 className="p-4 font-semibold text-xl">Rekap Transaksi Hari {endDate}</h1>

            <div className="flex flex-col gap-1 ml-4 mr-4">
                {loading ? (
                    <div className="text-center mt-4">Loading data...</div>
                ) : transactionDetail ? (
                    <>
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

                        <div className="flex gap-2 mt-3">
                            <div className="bg-white shadow-lg rounded-lg p-4 w-full flex flex-col gap-1">
                                <span className="font-semibold">Tunai</span>
                                <span>Rp. {transactionDetail?.payment_method_revenue.tunai}</span>
                            </div>
                            <div className="bg-white shadow-lg rounded-lg p-4 w-full flex flex-col gap-1">
                                <span className="font-semibold">Qris</span>
                                <span>Rp. {transactionDetail?.payment_method_revenue.qris}</span>
                            </div>
                        </div>

                        <div className="mt-4 bg-white p-4 rounded-lg flex flex-col gap-1 shadow-lg">
                            <span className="font-semibold">Total Pendapatan</span>
                            <span>Rp. {transactionDetail?.total_revenue}</span>
                        </div>
                    </>
                ) : (
                    !loading && <p className="text-center mt-4">Tidak ada data untuk rentang tanggal ini.</p>
                )}
            </div>

            <div id="dashboard-content" className="flex flex-col gap-1 ml-4 mr-4 hidden">
                <div className="pt-3 pb-3">
                    <h1 className="font-semibold">Rekap Transaksi Hari {endDate}</h1>
                </div>

                <div className="mt-4 bg-white shadow-lg rounded-lg">
                    <table className="table-auto w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 font-semibold border-b">Kategori</th>
                                <th className="px-4 py-2 font-semibold border-b">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 border-b">Total Transaksi</td>
                                <td className="px-4 py-2 border-b">{transactionDetail?.total_transactions}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b">Tunai</td>
                                <td className="px-4 py-2 border-b">Rp. {transactionDetail?.payment_method_revenue.tunai}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b">Qris</td>
                                <td className="px-4 py-2 border-b">Rp. {transactionDetail?.payment_method_revenue.qris}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Total Pendapatan</td>
                                <td className="px-4 py-2">Rp. {transactionDetail?.total_revenue}</td>
                            </tr>
                        </tbody>
                    </table>
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

export default SummaryPage;
