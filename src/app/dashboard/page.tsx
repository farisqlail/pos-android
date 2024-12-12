"use client";

import React, { useState, useEffect, useRef } from "react";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Chart from "chart.js";

import { getResource } from "@/services/fetch";

import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

interface TransactionDaily {
    date: string;
    count: number;
}

interface Transaction {
    total_transactions: number;
    total_items_sold: number;
    total_revenue: number;
    top_selling_product: string;
    top_promotion: string;
    daily_transactions: Array<TransactionDaily>
}

const DashboardPage: React.FC = () => {
    const [transactionDetail, setTransactionDetail] = useState<Transaction | null>(null);
    const [startDate, setStartDate] = useState<string>(() => {
        const today = new Date();
        today.setDate(today.getDate() - 7);
        return today.toISOString().split("T")[0];
    });
    const transactionsPerDay = [
        { date: "2024-12-01", count: 5 },
        { date: "2024-12-02", count: 3 },
    ];

    const [endDate, setEndDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const chartRef = useRef<HTMLCanvasElement | null>(null);

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

    useEffect(() => {
        if (chartRef.current && transactionDetail?.daily_transactions) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: transactionDetail.daily_transactions.map((data) => data.date),
                        datasets: [
                            {
                                label: "Jumlah Transaksi",
                                data: transactionDetail.daily_transactions.map((data) => data.count),
                                borderColor: "rgba(75, 192, 192, 1)",
                                backgroundColor: "rgba(75, 192, 192, 0.2)",
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            position: "top",
                        },
                        scales: {
                            xAxes: [
                                {
                                    display: true,
                                    gridLines: { display: false },
                                },
                            ],
                            yAxes: [
                                {
                                    display: true,
                                    ticks: { beginAtZero: true },
                                },
                            ],
                        },
                    },
                });
            }
        }
    }, [transactionsPerDay]);

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

            <div className="w-full p-4">
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                    Pilih Rentang Tanggal
                </label>
                <div className="flex gap-4">
                    <input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 block w-full p-2 rounded-md border border-black shadow-sm sm:text-sm"
                        max={new Date().toISOString().split("T")[0]}
                    />
                    <input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 block w-full p-2 rounded-md border border-black shadow-sm sm:text-sm"
                        max={new Date().toISOString().split("T")[0]}
                    />
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>

            <div className="flex flex-col gap-1 ml-4 mr-4 pb-[200px]">
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
                                <span className="font-semibold">Produk Terlaris</span>
                                <span>{transactionDetail?.top_selling_product}</span>
                            </div>
                            <div className="bg-white shadow-lg rounded-lg p-4 w-full flex flex-col gap-1">
                                <span className="font-semibold">Promo Banyak Terpakai</span>
                                <span>{transactionDetail?.top_promotion}</span>
                            </div>
                        </div>

                        <div className="mt-4 bg-white p-4 rounded-lg flex flex-col gap-1 shadow-lg">
                            <span className="font-semibold">Total Pendapatan</span>
                            <span>Rp. {transactionDetail?.total_revenue}</span>
                        </div>

                        <div className="mt-6 w-full h-96 bg-white p-4 shadow-lg rounded-lg">
                            <h2 className="text-lg font-semibold mb-4">Grafik Transaksi Harian</h2>
                            <canvas ref={chartRef}></canvas>
                        </div>
                    </>
                ) : (
                    !loading && <p className="text-center mt-4">Tidak ada data untuk rentang tanggal ini.</p>
                )}
            </div>

            <div id="dashboard-content" className="flex flex-col gap-1 ml-4 mr-4 hidden">
                <div className="flex gap-2 justify-between">
                    <span>Mulai : {startDate}</span>
                    <span>Sampai : {endDate}</span>
                </div>

                <div className="mt-4 bg-white shadow-lg rounded-lg p-4">
                    <table className="table-auto w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 font-semibold border-b">Kategori</th>
                                <th className="px-4 py-2 font-semibold border-b">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 border-b">Produk Terlaris</td>
                                <td className="px-4 py-2 border-b">{transactionDetail?.top_selling_product}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b">Promo Banyak Terpakai</td>
                                <td className="px-4 py-2 border-b">{transactionDetail?.top_promotion}</td>
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

export default DashboardPage;
