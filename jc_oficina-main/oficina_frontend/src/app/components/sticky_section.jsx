"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StickySection() {
    // Estado para controlar se o usuário é admin, inicializado com 'false' por padrão
    const [adminLoggedIn, setAdminLoggedIn] = useState(false);

    // Função para simular login/logout
    const handleLogout = () => {
        setAdminLoggedIn(false); // Define admin como falso ao fazer logout
        localStorage.setItem("adminLoggedIn", "false");
    };

    const handleLogin = () => {
        setAdminLoggedIn(true); // Define admin como verdadeiro ao fazer login
        localStorage.setItem("adminLoggedIn", "true");
    };

    useEffect(() => {
        // Acessa o localStorage apenas no lado do cliente
        const isAdmin = localStorage.getItem("adminLoggedIn");
        if (isAdmin === "true") {
            setAdminLoggedIn(true); // Define como admin logado
        } else {
            setAdminLoggedIn(false); // Define como não admin se o valor for "false" ou não existir
        }
    }, []); // O efeito só é executado uma vez após a montagem do componente (no cliente)

    return (
        <section className="bg-zinc-900 text-white flex justify-around gap-16 p-10 font-bold items-center sticky top-0 z-10">
            <ul className="flex gap-10">
                <Link href="/" className="hover:text-red-600"><li>INÍCIO</li></Link>
                <Link href="/sobre" className="hover:text-red-600"><li>SOBRE</li></Link>
                <Link href="/servicos" className="hover:text-red-600"><li>SERVIÇOS</li></Link>
                <Link href="/contato" className="hover:text-red-600"><li>CONTATO</li></Link>
            </ul>
            <div className="flex justify-around w-1/4">
                <button className="bg-red-600 p-3 w-44 rounded">
                    <Link href="https://web.whatsapp.com/send?phone=555194386958&text=Olá!%20Gostaria%20de%20fazer%20um%20agendamento!" target="_blank">
                        AGENDAR
                    </Link>
                </button>
                {adminLoggedIn ? (
                    <button 
                        className="border-red-600 border-2 w-44 rounded"
                        onClick={handleLogout}
                    >
                        LOGOUT
                    </button>
                ) : (
                    <button className="border-red-600 border-2 w-44 rounded"
                        onClick={handleLogin}
                    >
                        <Link href="/login">LOGIN</Link>
                    </button>
                )}
            </div>
        </section>
    );
}
