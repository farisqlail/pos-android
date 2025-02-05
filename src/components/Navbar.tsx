import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";

import { getResource } from "@/services/fetch";

interface CartItem {
    name: string;
    quantity: number;
}

interface stock {
    id: number;
    menu: {
        name: string;
    }
    stock: string;
}

const Navbar = () => {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [userRole, setUserRole] = useState<string>("");
    const { isOpen: isOpenNotif, onOpen: onOpenNotif, onOpenChange: onOpenChangeNotif } = useDisclosure();
    const [notificationCount, setNotificationCount] = useState(0);
    const [stocks, setStocks] = useState<stock[]>([]);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                setUserRole(parsedUser.role);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }

        const fetch = async () => {
            try {
                const response = await getResource<{ data: stock[] }>("stock");

                setStocks(response.data)
                setNotificationCount(response.data.length)
            } catch (error) {
                console.error("Error fetching menus:", error);
            }
        };

        fetch();
        const intervalId = setInterval(fetch, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, [])

    const getCartData = () => {
        const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(cartData);
    };

    useEffect(() => {
        getCartData();
        const interval = setInterval(getCartData, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleRemoveFromCart = (index: number) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const toCheckout = () => {
        router.push("/checkout");
    }

    const updateQuantity = (index: number, action: "increase" | "decrease") => {
        const updatedCart = [...cart];

        if (action === "increase") {
            updatedCart[index].quantity += 1;
        } else if (action === "decrease" && updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <div>
            <div className="flex flex-col h-fit">
                <div className="flex justify-between items-center p-4 text-black">
                    <div className="font-semibold text-md text-black flex items-center gap-2">
                        <div>
                            <Image src="/icons/logo.png" width={30} height={30} priority alt="logo" />
                        </div>
                        Warung Sate Muslim
                    </div>

                    {userRole !== "owner" && userRole !== "kitchen" && (
                        <div className="flex gap-2">
                            <div className="relative">
                                <div className="border border-black rounded-full p-2 cursor-pointer" onClick={onOpenNotif}>
                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.0009 5C13.4331 5 14.8066 5.50571 15.8193 6.40589C16.832 7.30606 17.4009 8.52696 17.4009 9.8C17.4009 11.7691 17.846 13.2436 18.4232 14.3279C19.1606 15.7133 19.5293 16.406 19.5088 16.5642C19.4849 16.7489 19.4544 16.7997 19.3026 16.9075C19.1725 17 18.5254 17 17.2311 17H6.77066C5.47638 17 4.82925 17 4.69916 16.9075C4.54741 16.7997 4.51692 16.7489 4.493 16.5642C4.47249 16.406 4.8412 15.7133 5.57863 14.3279C6.1558 13.2436 6.60089 11.7691 6.60089 9.8C6.60089 8.52696 7.16982 7.30606 8.18251 6.40589C9.19521 5.50571 10.5687 5 12.0009 5ZM12.0009 5V3M9.35489 20C10.0611 20.6233 10.9888 21.0016 12.0049 21.0016C13.0209 21.0016 13.9486 20.6233 14.6549 20" stroke="#000000" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    {notificationCount > 0 && (
                                        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                                            {notificationCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="border border-black rounded-full p-2" onClick={onOpen}>
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H13M19 15.5H17"
                                            stroke="#1c1c1c"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                                            stroke="#1c1c1c"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                                            stroke="#1c1c1c"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M5 6H8M5.5 13H16.0218C16.9812 13 17.4609 13 17.8366 12.7523C18.2123 12.5045 18.4013 12.0636 18.7792 11.1818L19.2078 10.1818C20.0173 8.29294 20.4221 7.34853 19.9775 6.67426C19.5328 6 18.5054 6 16.4504 6H12"
                                            stroke="#1c1c1c"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">Keranjang</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col">
                                    {cart.length > 0 ? (
                                        cart.map((item, index) => (
                                            <div key={index} className="border-b pb-3 text-black cursor-pointer flex justify-between items-center pt-3">
                                                <div className="flex gap-2">
                                                    <span className="font-semibold">{item.name}</span>
                                                </div>

                                                <div className="flex gap-2">
                                                    <div className="flex justify-between items-center gap-2 border border-black rounded-full w-[80px]">
                                                        <button
                                                            className="pt-1 pb-1 pl-2 pr-2"
                                                            onClick={() => updateQuantity(index, "decrease")}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button
                                                            className="pt-1 pb-1 pl-2 pr-2"
                                                            onClick={() => updateQuantity(index, "increase")}
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <div
                                                        className="border rounded-full p-1 border-[#e60000] cursor-pointer flex items-center"
                                                        onClick={() => handleRemoveFromCart(index)}
                                                    >
                                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                            <g id="SVGRepo_iconCarrier">
                                                                <path d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4" stroke="#e60000" strokeWidth="1.5" strokeLinecap="round" />
                                                                <path d="M20.5 6H3.49988" stroke="#e60000" strokeWidth="1.5" strokeLinecap="round" />
                                                                <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#e60000" strokeWidth="1.5" strokeLinecap="round" />
                                                                <path d="M9.5 11L10 16" stroke="#e60000" strokeWidth="1.5" strokeLinecap="round" />
                                                                <path d="M14.5 11L14 16" stroke="#e60000" strokeWidth="1.5" strokeLinecap="round" />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-black">Keranjang kosong</p>
                                    )}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex gap-2 w-full">
                                    <button className="border border-black rounded-lg p-3 text-black w-full" onClick={onClose}>Batal</button>
                                    <button
                                        className={`bg-black rounded-lg p-3 w-full text-white ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'}`}
                                        onClick={toCheckout}
                                        disabled={cart.length === 0}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenNotif} onOpenChange={onOpenChangeNotif}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="text-black">Notifikasi</ModalHeader>
                            <ModalBody>
                                {stocks.length === 0 ? (
                                    <p>Tidak ada data stok.</p>
                                ) : (
                                    stocks.map(stock => (
                                        <div key={stock.id} className="text-red-500">
                                            {stock.menu.name} - Stok Kosong
                                        </div>
                                    ))
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-black text-white w-full" onPress={onOpenChangeNotif}>
                                    Tutup
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Navbar;
