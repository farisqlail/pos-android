import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

const BottomNav: React.FC = () => {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [userRole, setUserRole] = useState<string>("");

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
    }, [])

    const toNavigation = (url: string) => {
        if (userRole == "owner") {
            router.push(url);
        } else {
            router.push("/unauthorized");
        }
    }

    const toHistory = () => {
        router.push("/history");
    }

    const logout = () => {
        localStorage.removeItem("user");
        router.push("/auth");
    }

    return (
        <div>
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white">
                <div className="flex justify-around items-center h-16">
                    <Link href="/home" className="flex flex-col items-center space-y-1">
                        <span>
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                                <g id="SVGRepo_iconCarrier"> <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" /> <path d="M15 18H9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" /> </g>
                            </svg>
                        </span>
                    </Link>
                    <div onClick={() => toNavigation("/menu")} className="flex flex-col items-center space-y-1">
                        <span>
                            <svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">

                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                                <g id="SVGRepo_iconCarrier">

                                    <path d="M39,19.5254a3.4529,3.4529,0,0,0-.2993-1.4111C38.3812,17.5365,35.45,10.4209,35,10.1834V6a3,3,0,0,0-6,0v4.1832c-.4345.2109-3.3953,7.38-3.7,7.931a3.4836,3.4836,0,0,0,2.0383,4.679,7.0471,7.0471,0,0,0-.19,10.2408A2.48,2.48,0,0,0,25,35.4844v9.0312A2.487,2.487,0,0,0,27.4844,47H29V60a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V47h1.5156A2.487,2.487,0,0,0,39,44.5156V35.4844a2.48,2.48,0,0,0-2.1479-2.45,7.047,7.047,0,0,0-.19-10.2407A3.4684,3.4684,0,0,0,39,19.5254ZM31,6a1,1,0,0,1,2,0V9.0576a7.5661,7.5661,0,0,0-2,0Zm2,53H31V47h2Zm4-23.5156v9.0312A.4853.4853,0,0,1,36.5156,45H27.4844A.4853.4853,0,0,1,27,44.5156V35.4844A.4853.4853,0,0,1,27.4844,35H30c.9967.002,3.0035-.0015,4,0h2.5156A.4853.4853,0,0,1,37,35.4844ZM37,28c-.2288,6.5877-9.7722,6.5862-10,0C27.2288,21.4123,36.7722,21.4138,37,28Zm-1.4746-7c-2.1982,0-4.8527,0-7.0508,0a1.482,1.482,0,0,1-1.3471-2.0733L30.26,11.876a1.4515,1.4515,0,0,1,.3391-.458,1.9005,1.9005,0,0,1,.6663-.3678,4.5011,4.5011,0,0,1,1.4686,0,1.9029,1.9029,0,0,1,.656.3589c.1471-.3044,3.3855,7.42,3.4828,7.5177A1.4826,1.4826,0,0,1,35.5254,21Z" />

                                    <path d="M45,6v4.1832c-.4345.2109-3.3953,7.38-3.7,7.931a3.4836,3.4836,0,0,0,2.0383,4.679,7.0471,7.0471,0,0,0-.19,10.2408A2.48,2.48,0,0,0,41,35.4844v9.0312A2.487,2.487,0,0,0,43.4844,47H45V60a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V47h1.5156A2.487,2.487,0,0,0,55,44.5156V35.4844a2.48,2.48,0,0,0-2.1479-2.45,7.047,7.047,0,0,0-.19-10.2407,3.4843,3.4843,0,0,0,2.0386-4.6791c-.3158-.572-3.2536-7.697-3.7006-7.9308V6A3,3,0,0,0,45,6Zm4,53H47V47h2Zm4-23.5156v9.0312A.4853.4853,0,0,1,52.5156,45H43.4844A.4853.4853,0,0,1,43,44.5156V35.4844A.4853.4853,0,0,1,43.4844,35H46c.9967.002,3.0035-.0015,4,0h2.5156A.4853.4853,0,0,1,53,35.4844ZM53,28c-.2288,6.5877-9.7722,6.5862-10,0C43.2288,21.4123,52.7722,21.4138,53,28Zm-.127-9.0732A1.4826,1.4826,0,0,1,51.5254,21H48c-.8644-.003-2.6707.0022-3.5254,0a1.482,1.482,0,0,1-1.3471-2.0733L46.26,11.876a1.4519,1.4519,0,0,1,.339-.4579,1.9,1.9,0,0,1,.6664-.3679,4.5011,4.5011,0,0,1,1.4686,0,1.9029,1.9029,0,0,1,.656.3589C49.5389,11.1142,52.7746,18.8222,52.873,18.9268ZM47,6a1,1,0,0,1,2,0V9.0576a7.5661,7.5661,0,0,0-2,0Z" />

                                    <path d="M23,19.5254a3.4529,3.4529,0,0,0-.2993-1.4111c-.32-.5778-3.2511-7.6934-3.7007-7.9309V6a3,3,0,0,0-6,0v4.1832c-.4345.2109-3.3953,7.38-3.7,7.931a3.4836,3.4836,0,0,0,2.0383,4.679,7.0471,7.0471,0,0,0-.19,10.2408A2.48,2.48,0,0,0,9,35.4844v9.0312A2.487,2.487,0,0,0,11.4844,47H13V60a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V47h1.5156A2.487,2.487,0,0,0,23,44.5156V35.4844a2.48,2.48,0,0,0-2.1479-2.45,7.047,7.047,0,0,0-.19-10.2407A3.4684,3.4684,0,0,0,23,19.5254ZM15,6a1,1,0,0,1,2,0V9.0576a7.5661,7.5661,0,0,0-2,0Zm2,53H15V47h2Zm4-23.5156v9.0312A.4853.4853,0,0,1,20.5156,45H11.4844A.4853.4853,0,0,1,11,44.5156V35.4844A.4853.4853,0,0,1,11.4844,35H14c.9967.002,3.0035-.0015,4,0h2.5156A.4853.4853,0,0,1,21,35.4844ZM21,28c-.2288,6.5877-9.7722,6.5862-10,0C11.2288,21.4123,20.7722,21.4138,21,28Zm-1.4746-7c-2.1982,0-4.8527,0-7.0508,0a1.482,1.482,0,0,1-1.3471-2.0733L14.26,11.876a1.4506,1.4506,0,0,1,.3392-.458,1.8991,1.8991,0,0,1,.6662-.3678,4.5011,4.5011,0,0,1,1.4686,0,1.9029,1.9029,0,0,1,.656.3589c.1471-.3044,3.3855,7.42,3.4828,7.5177A1.4826,1.4826,0,0,1,19.5254,21Z" />

                                </g>

                            </svg>
                        </span>
                    </div>
                    <div onClick={() => toNavigation("/promo")} className="flex flex-col items-center space-y-1">
                        <span>
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier"> <path d="M9 15L15 9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" /> <path d="M15.5 14.5C15.5 15.0523 15.0523 15.5 14.5 15.5C13.9477 15.5 13.5 15.0523 13.5 14.5C13.5 13.9477 13.9477 13.5 14.5 13.5C15.0523 13.5 15.5 13.9477 15.5 14.5Z" fill="#ffffff" /> <path d="M10.5 9.5C10.5 10.0523 10.0523 10.5 9.5 10.5C8.94772 10.5 8.5 10.0523 8.5 9.5C8.5 8.94772 8.94772 8.5 9.5 8.5C10.0523 8.5 10.5 8.94772 10.5 9.5Z" fill="#ffffff" /> <path d="M14.0037 4H9.9963C6.21809 4 4.32899 4 3.15525 5.17157C2.27661 6.04858 2.0557 7.32572 2.00016 9.49444C1.99304 9.77248 2.22121 9.99467 2.49076 10.0652C3.35074 10.2901 3.98521 11.0711 3.98521 12C3.98521 12.9289 3.35074 13.7099 2.49076 13.9348C2.22121 14.0053 1.99304 14.2275 2.00016 14.5056C2.0557 16.6743 2.27661 17.9514 3.15525 18.8284M18 4.10041C19.3086 4.22774 20.1885 4.51654 20.8448 5.17157C21.7234 6.04858 21.9443 7.32572 21.9998 9.49444C22.007 9.77248 21.7788 9.99467 21.5092 10.0652C20.6493 10.2901 20.0148 11.0711 20.0148 12C20.0148 12.9289 20.6493 13.7099 21.5092 13.9348C21.7788 14.0053 22.007 14.2275 21.9998 14.5056C21.9443 16.6743 21.7234 17.9514 20.8448 18.8284C19.671 20 17.7819 20 14.0037 20H9.9963C8.82865 20 7.84143 20 7 19.9654" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" /> </g>
                            </svg>
                        </span>
                    </div>
                    <div onClick={onOpen} className="flex flex-col items-center space-y-1">
                        <span>
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M15.9965 12H16.0054" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M11.9955 12H12.0045" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M7.99451 12H8.00349" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </g>
                            </svg>
                        </span>
                    </div>
                </div>
            </nav>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">Lainnya</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col">
                                    {userRole == "owner" && (
                                        <div className="border-b pb-3 text-black cursor-pointer" onClick={() => toNavigation("/dashboard")}>
                                            Dashboard
                                        </div>
                                    )}
                                    {userRole !== "owner" && (
                                        <div className="border-b pb-3 text-black mt-3 cursor-pointer" onClick={toHistory}>
                                            Riwayat Transaksi
                                        </div>
                                    )}
                                    {userRole == "owner" && (
                                        <>
                                            <div className="border-b pb-3 text-black mt-3 cursor-pointer" onClick={() => toNavigation("/users")}>
                                                Pengguna
                                            </div>
                                            <div className="border-b pb-3 text-black mt-3 cursor-pointer" onClick={() => toNavigation("/payments/list")}>
                                                Pembayaran
                                            </div>
                                        </>
                                    )}
                                    <div className="border-b pb-3 text-red-500 mt-3 cursor-pointer" onClick={logout}>
                                        Keluar
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default BottomNav;
