"use client"

import React from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from "@nextui-org/react";

import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const MenuPage = () => {
    const { isOpen: isOpenAdd, onOpen: onOpenAdd, onOpenChange: onOpenChangeAdd } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();

    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col gap-1 text-black">
            <Navbar />

            <div className="w-full p-4 flex gap-2">
                <Input type="email" variant="bordered" className="text-black" placeholder="cari menu ..." startContent={
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1c1c1c">
                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                        <g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>
                    </svg>
                } />
                <button className="bg-black text-white font-semibold p-2 rounded-lg text-sm" onClick={onOpenAdd}>Tambah</button>
            </div>

            <div className="flex flex-col gap-4 pr-4 pl-4 mt-2">
                <div className="p-4 border border-black rounded-lg flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold">Sate Ayam</span>
                        <span className="text-green-500">Rp 20.000 / 50</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="border rounded-full p-1 border-black" onClick={onOpenEdit}>
                            <svg width="30px" height="30px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.2942 7.95881C13.5533 7.63559 13.5013 7.16358 13.178 6.90453C12.8548 6.64549 12.3828 6.6975 12.1238 7.02072L13.2942 7.95881ZM6.811 14.8488L7.37903 15.3385C7.38489 15.3317 7.39062 15.3248 7.39623 15.3178L6.811 14.8488ZM6.64 15.2668L5.89146 15.2179L5.8908 15.2321L6.64 15.2668ZM6.5 18.2898L5.7508 18.2551C5.74908 18.2923 5.75013 18.3296 5.75396 18.3667L6.5 18.2898ZM7.287 18.9768L7.31152 19.7264C7.36154 19.7247 7.41126 19.7181 7.45996 19.7065L7.287 18.9768ZM10.287 18.2658L10.46 18.9956L10.4716 18.9927L10.287 18.2658ZM10.672 18.0218L11.2506 18.4991L11.2571 18.491L10.672 18.0218ZM17.2971 10.959C17.5562 10.6358 17.5043 10.1638 17.1812 9.90466C16.8581 9.64552 16.386 9.69742 16.1269 10.0206L17.2971 10.959ZM12.1269 7.02052C11.8678 7.34365 11.9196 7.81568 12.2428 8.07484C12.5659 8.33399 13.0379 8.28213 13.2971 7.95901L12.1269 7.02052ZM14.3 5.50976L14.8851 5.97901C14.8949 5.96672 14.9044 5.95412 14.9135 5.94123L14.3 5.50976ZM15.929 5.18976L16.4088 4.61332C16.3849 4.59344 16.3598 4.57507 16.3337 4.5583L15.929 5.18976ZM18.166 7.05176L18.6968 6.52192C18.6805 6.50561 18.6635 6.49007 18.6458 6.47532L18.166 7.05176ZM18.5029 7.87264L19.2529 7.87676V7.87676L18.5029 7.87264ZM18.157 8.68976L17.632 8.15412C17.6108 8.17496 17.5908 8.19704 17.5721 8.22025L18.157 8.68976ZM16.1271 10.0203C15.8678 10.3433 15.9195 10.8153 16.2425 11.0746C16.5655 11.3339 17.0376 11.2823 17.2969 10.9593L16.1271 10.0203ZM13.4537 7.37862C13.3923 6.96898 13.0105 6.68666 12.6009 6.74805C12.1912 6.80943 11.9089 7.19127 11.9703 7.60091L13.4537 7.37862ZM16.813 11.2329C17.2234 11.1772 17.5109 10.7992 17.4552 10.3888C17.3994 9.97834 17.0215 9.69082 16.611 9.74659L16.813 11.2329ZM12.1238 7.02072L6.22577 14.3797L7.39623 15.3178L13.2942 7.95881L12.1238 7.02072ZM6.24297 14.359C6.03561 14.5995 5.91226 14.9011 5.89159 15.218L7.38841 15.3156C7.38786 15.324 7.38457 15.3321 7.37903 15.3385L6.24297 14.359ZM5.8908 15.2321L5.7508 18.2551L7.2492 18.3245L7.3892 15.3015L5.8908 15.2321ZM5.75396 18.3667C5.83563 19.1586 6.51588 19.7524 7.31152 19.7264L7.26248 18.2272C7.25928 18.2273 7.25771 18.2268 7.25669 18.2264C7.25526 18.2259 7.25337 18.2249 7.25144 18.2232C7.2495 18.2215 7.24825 18.2198 7.24754 18.2185C7.24703 18.2175 7.24637 18.216 7.24604 18.2128L5.75396 18.3667ZM7.45996 19.7065L10.46 18.9955L10.114 17.536L7.11404 18.247L7.45996 19.7065ZM10.4716 18.9927C10.7771 18.9151 11.05 18.7422 11.2506 18.499L10.0934 17.5445C10.0958 17.5417 10.0989 17.5397 10.1024 17.5388L10.4716 18.9927ZM11.2571 18.491L17.2971 10.959L16.1269 10.0206L10.0869 17.5526L11.2571 18.491ZM13.2971 7.95901L14.8851 5.97901L13.7149 5.04052L12.1269 7.02052L13.2971 7.95901ZM14.9135 5.94123C15.0521 5.74411 15.3214 5.6912 15.5243 5.82123L16.3337 4.5583C15.4544 3.99484 14.2873 4.2241 13.6865 5.0783L14.9135 5.94123ZM15.4492 5.7662L17.6862 7.6282L18.6458 6.47532L16.4088 4.61332L15.4492 5.7662ZM17.6352 7.58161C17.7111 7.6577 17.7535 7.761 17.7529 7.86852L19.2529 7.87676C19.2557 7.36905 19.0555 6.88127 18.6968 6.52192L17.6352 7.58161ZM17.7529 7.86852C17.7524 7.97604 17.7088 8.07886 17.632 8.15412L18.682 9.22541C19.0446 8.87002 19.2501 8.38447 19.2529 7.87676L17.7529 7.86852ZM17.5721 8.22025L16.1271 10.0203L17.2969 10.9593L18.7419 9.15928L17.5721 8.22025ZM11.9703 7.60091C12.3196 9.93221 14.4771 11.5503 16.813 11.2329L16.611 9.74659C15.0881 9.95352 13.6815 8.89855 13.4537 7.37862L11.9703 7.60091Z" fill="#000000" />
                            </svg>
                        </div>
                        <div className="border rounded-full p-1 border-[#e60000]" onClick={onOpenDelete}>
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                <g id="SVGRepo_iconCarrier"> <path d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4" stroke="#e60000" stroke-width="1.5" stroke-linecap="round" /> <path d="M20.5 6H3.49988" stroke="#e60000" stroke-width="1.5" stroke-linecap="round" /> <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#e60000" stroke-width="1.5" stroke-linecap="round" /> <path d="M9.5 11L10 16" stroke="#e60000" stroke-width="1.5" stroke-linecap="round" /> <path d="M14.5 11L14 16" stroke="#e60000" stroke-width="1.5" stroke-linecap="round" /> </g>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>


            <Modal isOpen={isOpenAdd} onOpenChange={onOpenChangeAdd}>
                <ModalContent>
                    {(onCloseAdd) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">Tambah Menu</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="" className="text-black">Nama Menu</label>
                                    <Input type="text" variant="bordered" className="text-black" placeholder="Sate madura" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="" className="text-black">Harga</label>
                                    <Input type="number" variant="bordered" className="text-black" placeholder="20.000" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="" className="text-black">Stok</label>
                                    <Input type="number" variant="bordered" className="text-black" placeholder="20" />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex gap-2 w-full">
                                    <button className="border border-black rounded-lg p-3 text-black w-full" onClick={onCloseAdd}>Batal</button>
                                    <button className="bg-black rounded-lg p-3 w-full" onClick={onCloseAdd}>Tambah</button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenEdit} onOpenChange={onOpenChangeEdit}>
                <ModalContent>
                    {(onCloseEdit) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">Ubah Menu</ModalHeader>
                            <ModalBody>
                            <div className="flex flex-col gap-2">
                                    <label htmlFor="" className="text-black">Nama Menu</label>
                                    <Input type="text" variant="bordered" className="text-black" placeholder="Sate madura" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="" className="text-black">Harga</label>
                                    <Input type="number" variant="bordered" className="text-black" placeholder="20.000" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="" className="text-black">Stok</label>
                                    <Input type="number" variant="bordered" className="text-black" placeholder="20" />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex gap-2 w-full">
                                    <button className="border border-black rounded-lg p-3 text-black w-full" onClick={onCloseEdit}>Batal</button>
                                    <button className="bg-black rounded-lg p-3 w-full" onClick={onCloseEdit}>Ubah</button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

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
                                    <button className="bg-red-500 rounded-lg p-3 w-full" onClick={onCloseDelete}>Ya, hapus</button>
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
