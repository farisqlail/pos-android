"use client"

import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from "@nextui-org/react";
import { getResource, deleteResource, postResource, updateResource } from "@/services/fetch";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

interface StockDetails {
    id: number;
    stock: number;
    date: string;
}

interface MenuItem {
    id: number;
    name: string;
    price: string;
    stock: StockDetails;
}

interface StockItem {
    id: number;
    id_menu: number;
    stock: number;
    date: string;
}

interface StockResponse {
    success: boolean;
    message: string;
    data: StockItem[];
    stock: number;
}

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [idProduct, setIdProduct] = useState<number>(0);
    const [name, setName] = useState("");
    const [price, setPrice] = useState<string | "">("");
    const [userRole, setUserRole] = useState<string>("");
    const [stockData, setStockData] = useState<StockItem[]>([]);
    const [newStock, setNewStock] = useState<number | "">("");
    const [idStock, setIdStock] = useState<number>(0);

    const { isOpen: isOpenAdd, onOpen: onOpenAdd, onOpenChange: onOpenChangeAdd, onClose: onCloseAdd } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit, onClose: onCloseEdit } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete, onClose: onCloseDelete } = useDisclosure();
    const { isOpen: isOpenStock, onOpen: onOpenStock, onOpenChange: onOpenChangeStock, onClose: onCloseStock } = useDisclosure();

    const filteredMenuItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                const data = await getResource<{ data: MenuItem[] }>("menus-all");
                setMenuItems(data.data);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching menus:", error);
            }
        };

        fetchMenus();
    }, []);

    const openDelete = (id: number) => {
        setIdProduct(id);
        onOpenDelete();
    }

    const deleteData = async () => {
        try {
            await deleteResource(`menus/${idProduct}`);
            onCloseDelete();
            location.reload();
        } catch (error) {
            console.log("Error deleting menu:", error);
        }
    }

    const addMenu = async () => {
        const dataProduct = {
            name,
            price: Number(price),
        }

        try {
            const data = await postResource("menus", dataProduct);
            if (data) {
                onCloseAdd();
                location.reload();
            } else {
                console.log("Ada yang salah");
            }
        } catch (error) {
            console.error("Error adding menu:", error);
        }
    };

    const openModalEdit = (item: MenuItem) => {
        setIdProduct(item.id);
        setName(item.name);
        setPrice(item.price);
        onOpenEdit();
    }

    const editMenu = async () => {
        const dataProduct = {
            name,
            price: Number(price),
        };

        try {
            const data = await updateResource(`menus/${idProduct}`, dataProduct);
            if (data) {
                onCloseEdit();
                location.reload();
            } else {
                console.log("Ada yang salah");
            }
        } catch (error) {
            console.error("Error updating menu:", error);
        }
    };

    const openModalStock = async (item: MenuItem) => {
        try {
            const response = await getResource<StockResponse>(`menu-stocks/${item.id}`);

            setIdProduct(item.id);
            setStockData(response.data);
            setNewStock(response.stock);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        }
        onOpenStock();
    }

    const createStock = async () => {
        setIdProduct(0);

        const stockDataToCreate = {
            id_menu: idProduct,
            stock: newStock,
            date: new Date().toISOString().split('T')[0],
        };

        try {
            await postResource("menu-stocks", stockDataToCreate);
            onCloseStock();
            location.reload();
        } catch (error) {
            console.error("Error creating stock:", error);
        }
    };

    const updateStock = async () => {
        const stockDataToUpdate = {
            id_menu: idProduct,
            stock: newStock,
            date: new Date().toISOString().split('T')[0],
        };

        try {
            await updateResource(`menu-stocks/${idStock}`, stockDataToUpdate);
            onCloseStock();
            location.reload();
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    const deleteStock = async (stockId: number) => {
        try {
            await deleteResource(`menu-stocks/${stockId}`);
            location.reload();
        } catch (error) {
            console.error("Error deleting stock:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col gap-1 text-black pb-[100px]">
            <Navbar />

            <div className="w-full p-4 flex gap-2">
                <Input type="text" variant="bordered" className="text-black" placeholder="cari menu ..." startContent={
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1c1c1c">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </g>
                    </svg>
                } value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                {userRole === "owner" && (
                    <button className="bg-black text-white font-semibold p-2 rounded-lg text-sm" onClick={onOpenAdd}>Tambah</button>
                )}
            </div>

            <div className="flex flex-col gap-4 pr-4 pl-4 mt-2">
                {loading ? (
                    <div className="flex flex-col gap-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="p-4 border border-gray-300 rounded-lg animate-pulse flex justify-between items-center">
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                                    <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    filteredMenuItems.map((item) => {
                        const todayStock = item.stock ? item.stock.stock : 0;

                        return (
                            <div key={item.id} className="p-4 border border-black rounded-lg flex justify-between items-center">
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold">{item.name}</span>
                                    <span className="text-green-500">
                                        Rp {parseFloat(item.price).toLocaleString()}
                                        {todayStock > 0 ?
                                            ` / ${todayStock}` : ""
                                        }
                                    </span>
                                </div>
                                {userRole === "owner" ? (
                                    <div className="flex gap-2">
                                        <div className="border rounded-full p-1 border-black" onClick={() => openModalStock(item)}>
                                            <svg width="30px" height="30px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.8832 4.69719C19.2737 4.30667 19.9069 4.30667 20.2974 4.69719L23.888 8.28778L27.469 4.7068C27.8595 4.31628 28.4927 4.31628 28.8832 4.7068C29.2737 5.09733 29.2737 5.73049 28.8832 6.12102L25.3022 9.702L28.7827 13.1825C29.1732 13.573 29.1732 14.2062 28.7827 14.5967C28.3922 14.9872 27.759 14.9872 27.3685 14.5967L23.888 11.1162L20.3979 14.6063C20.0074 14.9968 19.3743 14.9968 18.9837 14.6063C18.5932 14.2158 18.5932 13.5826 18.9837 13.1921L22.4738 9.702L18.8832 6.1114C18.4927 5.72088 18.4927 5.08771 18.8832 4.69719Z" fill="#333333" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M23.86 15.0513C24.0652 14.9829 24.2871 14.9829 24.4923 15.0513L39.2705 19.9765C39.4691 20.0336 39.6499 20.1521 39.783 20.323L43.7861 25.4612C43.9857 25.7173 44.0485 26.0544 43.9545 26.3652C43.8902 26.5779 43.7579 26.7602 43.5821 26.887L28.1827 32.0159L24.965 27.8858C24.7754 27.6424 24.4839 27.5001 24.1753 27.5004C23.8667 27.5007 23.5755 27.6434 23.3863 27.8871L20.186 32.0093L4.74236 26.8577C4.58577 26.7329 4.46805 26.5621 4.40853 26.3652C4.31456 26.0544 4.37733 25.7173 4.57688 25.4612L8.50799 20.4154C8.62826 20.2191 8.81554 20.0652 9.04466 19.9889L23.86 15.0513ZM35.8287 20.9376L24.1802 24.8197L12.5277 20.9362L24.1762 17.0541L35.8287 20.9376Z" fill="#333333" />
                                                <path d="M28.1442 34.1368L39.991 30.1911L39.9905 36.7628C39.9905 38.054 39.1642 39.2003 37.9392 39.6086L25.1762 43.863V31.4111L27.0393 33.8026C27.2997 34.1368 27.7423 34.2706 28.1442 34.1368Z" fill="#333333" />
                                                <path d="M23.1762 31.4191V43.863L10.4131 39.6086C9.18811 39.2003 8.36183 38.054 8.36175 36.7628L8.36132 30.1732L20.2251 34.1306C20.6277 34.2649 21.0712 34.1305 21.3314 33.7953L23.1762 31.4191Z" fill="#333333" />
                                            </svg>
                                        </div>
                                        <div className="border rounded-full p-1 border-black" onClick={() => openModalEdit(item)}>
                                            <svg width="30px" height="30px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.2942 7.95881C13.5533 7.63559 13.5013 7.16358 13.178 6.90453C12.8548 6.64549 12.3828 6.6975 12.1238 7.02072L13.2942 7.95881ZM6.811 14.8488L7.37903 15.3385C7.38489 15.3317 7.39062 15.3248 7.39623 15.3178L6.811 14.8488ZM6.64 15.2668L5.89146 15.2179L5.8908 15.2321L6.64 15.2668ZM6.5 18.2898L5.7508 18.2551C5.74908 18.2923 5.75013 18.3296 5.75396 18.3667L6.5 18.2898ZM7.287 18.9768L7.31152 19.7264C7.36154 19.7247 7.41126 19.7181 7.45996 19.7065L7.287 18.9768ZM10.287 18.2658L10.46 18.9956L10.4716 18.9927L10.287 18.2658ZM10.672 18.0218L11.2506 18.4991L11.2571 18.491L10.672 18.0218ZM17.2971 10.959C17.5562 10.6358 17.5043 10.1638 17.1812 9.90466C16.8581 9.64552 16.386 9.69742 16.1269 10.0206L17.2971 10.959ZM12.1269 7.02052C11.8678 7.34365 11.9196 7.81568 12.2428 8.07484C12.5659 8.33399 13.0379 8.28213 13.2971 7.95901L12.1269 7.02052ZM14.3 5.50976L14.8851 5.97901C14.8949 5.96672 14.9044 5.95412 14.9135 5.94123L14.3 5.50976ZM15.929 5.18976L16.4088 4.61332C16.3849 4.59344 16.3598 4.57507 16.3337 4.5583L15.929 5.18976ZM18.166 7.05176L18.6968 6.52192C18.6805 6.50561 18.6635 6.49007 18.6458 6.47532L18.166 7.05176ZM18.5029 7.87264L19.2529 7.87676V7.87676L18.5029 7.87264ZM18.157 8.68976L17.632 8.15412C17.6108 8.17496 17.5908 8.19704 17.5721 8.22025L18.157 8.68976ZM16.1271 10.0203C15.8678 10.3433 15.9195 10.8153 16.2425 11.0746C16.5655 11.3339 17.0376 11.2823 17.2969 10.9593L16.1271 10.0203ZM13.4537 7.37862C13.3923 6.96898 13.0105 6.68666 12.6009 6.74805C12.1912 6.80943 11.9089 7.19127 11.9703 7.60091L13.4537 7.37862ZM16.813 11.2329C17.2234 11.1772 17.5109 10.7992 17.4552 10.3888C17.3994 9.97834 17.0215 9.69082 16.611 9.74659L16.813 11.2329ZM12.1238 7.02072L6.22577 14.3797L7.39623 15.3178L13.2942 7.95881L12.1238 7.02072ZM6.24297 14.359C6.03561 14.5995 5.91226 14.9011 5.89159 15.218L7.38841 15.3156C7.38786 15.324 7.38457 15.3321 7.37903 15.3385L6.24297 14.359ZM5.8908 15.2321L5.7508 18.2551L7.2492 18.3245L7.3892 15.3015L5.8908 15.2321ZM5.75396 18.3667C5.83563 19.1586 6.51588 19.7524 7.31152 19.7264L7.26248 18.2272C7.25928 18.2273 7.25771 18.2268 7.25669 18.2264C7.25526 18.2259 7.25337 18.2249 7.25144 18.2232C7.2495 18.2215 7.24825 18.2198 7.24754 18.2185C7.24703 18.2175 7.24637 18.216 7.24604 18.2128L5.75396 18.3667ZM7.45996 19.7065L10.46 18.9955L10.114 17.536L7.11404 18.247L7.45996 19.7065ZM10.4716 18.9927C10.7771 18.9151 11.05 18.7422 11.2506 18.499L10.0934 17.5445C10.0958 17.5417 10.0989 17.5397 10.1024 17.5388L10.4716 18.9927ZM11.2571 18.491L17.2971 10.959L16.1269 10.0206L10.0869 17.5526L11.2571 18.491ZM13.2971 7.95901L14.8851 5.97901L13.7149 5.04052L12.1269 7.02052L13.2971 7.95901ZM14.9135 5.94123C15.0521 5.74411 15.3214 5.6912 15.5243 5.82123L16.3337 4.5583C15.4544 3.99484 14.2873 4.2241 13.6865 5.0783L14.9135 5.94123ZM15.4492 5.7662L17.6862 7.6282L18.6458 6.47532L16.4088 4.61332L15.4492 5.7662ZM17.6352 7.58161C17.7111 7.6577 17.7535 7.761 17.7529 7.86852L19.2529 7.87676C19.2557 7.36905 19.0555 6.88127 18.6968 6.52192L17.6352 7.58161ZM17.7529 7.86852C17.7524 7.97604 17.7088 8.07886 17.632 8.15412L18.682 9.22541C19.0446 8.87002 19.2501 8.38447 19.2529 7.87676L17.7529 7.86852ZM17.5721 8.22025L16.1271 10.0203L17.2969 10.9593L18.7419 9.15928L17.5721 8.22025ZM11.9703 7.60091C12.3196 9.93221 14.4771 11.5503 16.813 11.2329L16.611 9.74659C15.0881 9.95352 13.6815 8.89855 13.4537 7.37862L11.9703 7.60091Z" fill="#000000" />
                                            </svg>
                                        </div>
                                        <div className="border rounded-full p-1 border-[#e60000]" onClick={() => openDelete(item.id)}>
                                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                <g id="SVGRepo_iconCarrier"> <path d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4" stroke="#e60000" strokeWidth="1.5" strokeLinecap="round" /> <path d="M20.5 6H3.49988" stroke="#e60000" strokeWidth="1.5" strokeLinecap="round" /> <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#e60000" strokeWidth="1.5" strokeLinecap="round" /> <path d="M9.5 11L10 16" stroke="#e60000" strokeWidth="1.5" strokeLinecap="round" /> <path d="M14.5 11L14 16" stroke="#e60000" strokeWidth="1.5" strokeLinecap="round" /> </g>
                                            </svg>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1 items-center">
                                        <span className="font-semibold">Stok</span>
                                        <span>{todayStock}</span> {/* Display today's stock amount */}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Add Menu Modal */}
            <Modal isOpen={isOpenAdd} onOpenChange={onOpenChangeAdd}>
                <ModalContent>
                    {(onCloseAdd) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">Tambah Menu</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="" className="text-black">Nama Menu</label>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        className="text-black"
                                        placeholder="Sate Ayam"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="" className="text-black">Harga</label>
                                    <Input
                                        type="number"
                                        variant="bordered"
                                        className="text-black"
                                        placeholder="20000"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex gap-2 w-full">
                                    <button className="border border-black rounded-lg p-3 text-black w-full" onClick={onCloseAdd}>
                                        Batal
                                    </button>
                                    <button
                                        className="bg-black rounded-lg p-3 w-full"
                                        onClick={() => {
                                            addMenu();
                                            onCloseAdd();
                                        }}
                                    >
                                        Tambah
                                    </button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Edit Menu Modal */}
            <Modal isOpen={isOpenEdit} onOpenChange={onOpenChangeEdit}>
                <ModalContent>
                    {(onCloseEdit) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">Ubah Menu</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="" className="text-black">Nama Menu</label>
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        className="text-black"
                                        placeholder="Sate Ayam"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="" className="text-black">Harga</label>
                                    <Input
                                        type="number"
                                        variant="bordered"
                                        className="text-black"
                                        placeholder="20000"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex gap-2 w-full">
                                    <button
                                        className="border border-black rounded-lg p-3 text-black w-full"
                                        onClick={onCloseEdit}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        className="bg-black rounded-lg p-3 w-full"
                                        onClick={editMenu}
                                    >
                                        Ubah
                                    </button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Delete Menu Modal */}
            <Modal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete}>
                <ModalContent>
                    {(onCloseDelete) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">Hapus Menu</ModalHeader>
                            <ModalBody>
                                <span className="text-black">Apakah anda yakin ingin menghapus menu ini ? </span>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex gap-2 w-full">
                                    <button className="border border-black rounded-lg p-3 text-black w-full" onClick={onCloseDelete}>Batal</button>
                                    <button className="bg-red-500 rounded-lg p-3 w-full" onClick={deleteData}>Ya, hapus</button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Stock Modal */}
            <Modal isOpen={isOpenStock} onOpenChange={onOpenChangeStock}>
                <ModalContent>
                    {(onCloseStock) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">Atur Stok</ModalHeader>
                            <ModalBody>
                                {/* List of Stocks */}
                                <div className="flex flex-col gap-4">
                                    <h2 className="font-semibold text-black">Stok Produk</h2>
                                    <div className="overflow-y-auto max-h-40">
                                        {Array.isArray(stockData) && stockData.length > 0 ? (
                                            stockData.map((stock) => (
                                                <div key={stock.id} className="flex justify-between items-center p-2 border-b">
                                                    <span className="text-black">{stock.stock} Tanggal: {stock.date}</span>
                                                    <div className="flex gap-2">
                                                        <button
                                                            className="text-blue-500"
                                                            onClick={() => {
                                                                setNewStock(stock.stock);
                                                                setIdStock(stock.id);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="text-red-500"
                                                            onClick={() => deleteStock(stock.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No stock available.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 mt-4">
                                    <label htmlFor="" className="text-black">Jumlah Stok</label>
                                    <Input
                                        type="number"
                                        variant="bordered"
                                        className="text-black"
                                        placeholder="Enter stock amount"
                                        value={newStock !== "" ? String(newStock) : ""}
                                        onChange={(e) => setNewStock(Number(e.target.value))}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex gap-2 w-full">
                                    <button className="border border-black rounded-lg p-3 text-black w-full" onClick={onCloseStock}>Cancel</button>
                                    <button
                                        className="bg-black rounded-lg p-3 w-full"
                                        onClick={idStock ? updateStock : createStock}
                                    >
                                        {idStock ? "Update Stok" : "Add Stok"}
                                    </button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <BottomNav />
        </div>
    );
};

export default MenuPage;  
