"use client";

import React from "react";

import { jsPDF } from "jspdf";

import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const DashboardPage = () => {
    const printPDF = () => {
        const doc = new jsPDF();
        const content = document.querySelector("#dashboard-content");
        if (content) {
            doc.html(content as HTMLElement, {
                callback: (doc) => {
                    doc.save("dashboard.pdf");
                },
                x: 10,
                y: 10,
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col gap-1 text-black">
            <Navbar />
            <div id="dashboard-content" className="flex flex-col gap-1 ml-4 mr-4">
                <div className="flex gap-2">
                    <div className="bg-white shadow-lg rounded-lg p-4 w-full flex flex-col gap-1">
                        <span className="font-semibold">Transaksi</span>
                        <span>17</span>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4 w-full flex flex-col gap-1">
                        <span className="font-semibold">Produk Terjual</span>
                        <span>17</span>
                    </div>
                </div>

                <div className="mt-4 bg-white p-4 rounded-lg flex flex-col gap-1 shadow-lg">
                    <span className="font-semibold">Total Pendapatan</span>
                    <span>Rp. 30.000.000</span>
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
