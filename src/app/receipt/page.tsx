"use client"

import React from "react";
import { useRouter } from "next/navigation";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

const ReceiptPage = () => {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const toHome = () => {
        localStorage.removeItem("cart");
        router.push("/home")
    }

    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col justify-center items-center gap-1 text-black w-full p-4">
            <div className="bg-white shadow-md p-4 rounded-lg w-full flex flex-col items-center">
                <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                    <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#11df14" /> </g>
                </svg>

                <span className="font-semibold text-xl">Pembayaran selesai</span>

                <div className="flex flex-col gap-2 w-full mt-4">
                    <div className="flex justify-between items-center">
                        <span>Nomor Nota</span>
                        <span>09098908098</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Tanggal Transaksi</span>
                        <span>12-12-2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Tipe Pembayaran</span>
                        <span>Tunai</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Total</span>
                        <span className="font-semibold">Rp. 10.000</span>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-5 left-0 right-0 flex flex-col gap-3">
                <div className="pl-4 pr-4">
                    <button className="bg-black rounded-lg p-3 w-full font-semibold text-white" onClick={onOpen}>Kirim Nota</button>
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">Tulis Nomor</ModalHeader>
                            <ModalBody>
                                <Input type="number" placeholder="08523xxxxxxx" />
                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-black text-white w-full" onPress={toHome}>
                                    Kirim
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ReceiptPage;
