import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/link";

export default function WhatsappIcon() {
    return (
        <section className="fixed z-50 bottom-10 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition">
            <Link href="https://web.whatsapp.com/send?phone=555194386958&text=Olá!%20Gostaria%20de%20fazer%20um%20agendamento!" target="_blank" rel="noopener noreferrer">
                <IoLogoWhatsapp className="w-10 h-10" />
            </Link>
        </section>
    );
}
