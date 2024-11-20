"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image"
import { useRouter } from "next/navigation";

import { postResource } from "@/services/fetch";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

interface CheckoutItem {
    promo: number;
    subTotal: number;
    total: number
}

const QrisPage = () => {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [dataCheckout, setDataCheckout] = useState<CheckoutItem | null>(null);
    const [total, setTotal] = useState<string>("");
    const [userId, setUserid] = useState<string>("");

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

    const toReceipt = async () => {
        const dataTransaction = {
            menus: cart,
            user_id: userId,
            total: 20000,
            status_payment: "paid",
            status_transactions: "pending",
            discount_amount: dataCheckout?.promo,
            id_promo: 1,
            payment: "qris"
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
        <div className="flex flex-col justify-center items-center min-h-screen bg-white w-full">
            <div className="font-semibold flex flex-col justify-center items-center bg-white shadow-md p-4 rounded-lg">
                <Image src="/images/qris.png" width={250} height={250} alt="logo" priority />
                <p className="mt-2 text-black">Total harga : </p>
                <span className="text-xl text-black">Rp. {total}</span>
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
                                <Input type="number" value={total} readOnly />
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
