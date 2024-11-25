import { PiPhoneCall } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa6";

import StickySection from "./sticky_section.jsx";
import Image from "next/image";




export default function Header() {
    return(
        <>
            <section className="bg-zinc-900 text-white flex justify-around p-10 font-bold items-center gap-16">
            <Image
                src="/logo.png" 
                alt="logo da oficina"
                width={200}
                height={200}
                
            />
            <div className="flex gap-16">
                    <div className="flex items-center gap-4">
                        <PiPhoneCall className="w-8 h-8 text-red-600" />
                        <div>
                            <p className="text-gray-300 font-light text-sm">Telefone</p>
                            <p>(51) 9 9438-6958</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaRegClock className="w-8 h-8 text-red-600"/>
                        <div>
                            <p className="text-gray-300 font-light text-sm">Segunda - Sexta</p>
                            <p>8hrs - 18hrs</p>
                        </div>
                    </div>
            </div>
            </section>
            <StickySection/>
        </>
    )
}