"use client"

import React, { useEffect } from "react";
import Image from "next/image"
import { useRouter } from "next/navigation";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

const QrisPage = () => {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const toReceipt = () => {
        router.push("/receipt")
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white w-full">
            <div className="font-semibold flex flex-col justify-center items-center bg-white shadow-md p-4 rounded-lg">
                <Image src="/images/qris.png" width={250} height={250} alt="logo" priority />
                <p className="mt-2 text-black">Total harga : </p>
                <span className="text-xl text-black">Rp. 20.000</span>
            </div>


            <div className="fixed bottom-5 left-0 right-0 flex flex-col gap-3">
                <div className="pl-4 pr-4">
                    <button className="bg-black rounded-lg p-3 w-full font-semibold text-white" onClick={onOpen}>Konfirmasi Pembayaran</button>
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">Jumlah Pembayaran</ModalHeader>
                            <ModalBody>
                                <Input type="number" value="20000" readOnly />
                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-black text-white w-full" onClick={toReceipt}>
                                    Konfirmasi
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default QrisPage;
