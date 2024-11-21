"use client";

import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import { getResource } from "@/services/fetch";

import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

interface Menu {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface CartItem extends Menu {
    quantity: number;
}

interface Transaction {
    id: number;
    no_nota: string;
    grand_total: string;
    status_transaction: string;
}

const HomePage = () => {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [
        , setCart] = useState<CartItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userRole, setUserRole] = useState<string>("");
    const [selectedDate,] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });

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

        const fetchMenus = async () => {
            try {
                const [year, month, day] = selectedDate.split("-");
                const dataTransaction = await getResource<Transaction[]>(`transactions?day=${day}&month=${month}&year=${year}`);
                const data = await getResource<{ data: Menu[] }>("menus");

                const pendingTransactions = dataTransaction.filter(
                    (transaction) => transaction.status_transaction === "pending"
                );

                setTransactions(pendingTransactions);
                setMenus(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching menus:", error);
            }
        };

        fetchMenus();
    }, []);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredMenus = menus.filter((menu) =>
        menu.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddToCart = (menu: Menu) => {
        const currentCart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
        const itemIndex = currentCart.findIndex((item) => item.id === menu.id);

        if (itemIndex !== -1) {
            currentCart[itemIndex].quantity += 1;
        } else {
            const newItem = { ...menu, quantity: 1 };
            currentCart.push(newItem);
        }

        setCart(currentCart);
        localStorage.setItem("cart", JSON.stringify(currentCart));

        setIsModalOpen(true);
        setTimeout(() => {
            setIsModalOpen(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col gap-1 text-black">
            <Navbar />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg text-center flex flex-col justify-center items-center">
                        <Image src="/images/success-cart.png" width={200} height={200} alt="illustration" />
                        <p className="text-black font-semibold">Item berhasil ditambahkan ke keranjang!</p>
                    </div>
                </div>
            )}

            <div className="w-full p-4">
                <Input
                    type="email"
                    variant="bordered"
                    className="text-black"
                    placeholder="cari makanan atau minuman ..."
                    startContent={
                        <svg
                            width="30px"
                            height="30px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#1c1c1c"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                                    stroke="#666666"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </g>
                        </svg>
                    }
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {userRole !== "kitchen" ? (
                <div className="flex flex-col gap-2 pl-4 pr-4">
                    <div className="flex flex-col">
                        <div className="border-b pb-2">
                            <span className="font-semibold">Menu</span>
                        </div>

                        <div className="flex flex-col gap-2 mt-2 mb-3 p-0">
                            {loading ? (
                                [...Array(5)].map((_, index) => (
                                    <div key={index} className="flex justify-between items-center p-2">
                                        <div className="flex gap-2">
                                            <div className="p-3 bg-[#d1d5db] rounded-lg w-[50px] h-[50px] animate-pulse"></div>
                                            <div className="flex flex-col gap-2">
                                                <div className="bg-gray-300 w-[120px] h-[16px] animate-pulse"></div>
                                                <div className="bg-gray-300 w-[80px] h-[16px] animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))

                            ) : (
                                filteredMenus.length > 0 ? (
                                    filteredMenus.map((menu) => (
                                        <div key={menu.id} className="flex justify-between items-center p-2">
                                            <div className="flex gap-2">
                                                <div className="p-3 bg-[#d1d5db] rounded-lg flex justify-center items-center text-black font-semibold w-[50px]">
                                                    {menu.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <span className="font-semibold">{menu.name}</span>
                                                    <span className="text-green-500">Rp. {menu.price}</span>
                                                </div>
                                            </div>

                                            <div className="border border-black rounded-lg" onClick={() => handleAddToCart(menu)}>
                                                <svg
                                                    width="30px"
                                                    height="30px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path
                                                            d="M6 12H18M12 6V18"
                                                            stroke="#0d0d0d"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center">Menu tidak ditemukan</p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-3 ml-4 mr-4 mb-[100px]">
                    <div className="mb-3">
                        <span className="font-semibold">Transaksi butuh diproses</span>
                    </div>
                    {loading ? (
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
                                            {transaction?.status_transaction == "completed" ? "selesai" : transaction?.status_transaction}
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
            )}

            <BottomNav />
        </div>
    );
};

export default HomePage;
