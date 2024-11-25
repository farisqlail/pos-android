import React from "react";
import { useRouter } from "next/navigation";

interface NavbarPaymentProps {
    title: string;
    route: string;
}

const NavbarPayment: React.FC<NavbarPaymentProps> = ({ title, route }) => {
    const router = useRouter();

    const navigateToRoute = () => {
        router.push(route);
    }

    return (
        <div>
            <div className="flex flex-col h-fit">
                <div className="flex justify-between items-center p-4 text-black">
                    <div className="font-semibold text-md text-black flex items-center gap-2">
                        <div onClick={navigateToRoute}>
                            <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </g>
                            </svg>
                        </div>
                        <span className="font-semibold">{title}</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NavbarPayment;
