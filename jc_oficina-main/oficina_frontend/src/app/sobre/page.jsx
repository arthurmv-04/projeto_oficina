
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

import Image from "next/image";
import Link from "next/link";

import { CiSquarePlus } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { GoTrophy } from "react-icons/go";
import { LiaCogSolid } from "react-icons/lia";





export default function Sobre(){
    return(
        <>
            <Header/>
            <section className="flex justify-center items-center flex-col relative bg-zinc-900">
                <Image src="/fundo_sobre.jpg" width={900} height={50} alt="audi a3 98 correndo na estrada" className="opacity-50"/>
                <div className="absolute text-white text-center bottom-9">
                    <p className="text-lg"> <Link href="/">Início</Link> / Sobre</p>
                    <h2 className="text-6xl font-bold">Sobre</h2>
                </div>
            </section>
            <section className="bg-zinc-800 text-white flex justify-center gap-10 pt-20">
                <div className="w-2/4 flex flex-col gap-10">
                    <h3 className="text-3xl font-bold">Sobre a JC Oficina Mecânica</h3>
                    <p className="font-light text-sm text-neutral-400">Somos a <span className="text-white">JC Oficina Mecânica</span>, auto mecânica com preço justo e competitivo! Trabalhamos com revisão e manutenção de veículos multimarcas. Nosso atendimento é exclusivo e personalizado.</p>

                    <ul className="flex flex-col gap-10 text-lg font-bold">
                        <li className="flex items-center gap-5">
                            <CiSquarePlus className="w-8 h-8 font-bold"/>
                            INJEÇÃO ELETRÔNICA
                        </li>
                        <li className="flex items-center gap-5">
                            <CiSquarePlus className="w-8 h-8 font-bold"/>
                            INJEÇÃO PROGRAMÁVEL
                        </li>
                        <li className="flex items-center gap-5">                        
                            <CiSquarePlus className="w-8 h-8 font-bold"/>
                            FREIOS - SIMPLES E ABS
                        </li>
                        <li className="flex items-center gap-5">                            
                            <CiSquarePlus className="w-8 h-8 font-bold"/>
                            SUSPENSÃO EM GERAL
                        </li>
                        <li className="flex items-center gap-5">                            
                            <CiSquarePlus className="w-8 h-8 font-bold"/>
                            CÂMBIO - MECÂNICO E AUTOMÂTICO
                        </li>
                        <li className="flex items-center gap-5">                            
                            <CiSquarePlus className="w-8 h-8 font-bold"/>
                            TROCA DE ÓLEO, FLUÍDOS E FILTROS
                        </li>
                        <li className="flex items-center gap-5">                            
                            <CiSquarePlus className="w-8 h-8 font-bold"/>
                            SISTEMA DE ARREFECIMENTO
                        </li>
                        <li className="flex items-center gap-5">                            
                            <CiSquarePlus className="w-8 h-8 font-bold"/>
                            DIAGNÓSTICOS
                        </li>
                    </ul>
                </div>
                <Image src="/sobre.jpg" width={500} height={500} alt="sobre"/>
            </section>
            <section className="bg-zinc-800 text-white flex flex-col justify-center items-center gap-2 pt-40">
                <h3 className="font-bold text-lg">QUER TIRAR ALGUMA DÚVIDA OU TEM ALGUM PROJETO?</h3>
                <h3 className="font-bold text-xl">CHAMA NO WHATSAPP</h3>
                <p className="text-neutral-400">Basta clicar no Icon do Whats no canto inferior direito.</p>
            </section>
            <section className="bg-zinc-800 text-white flex flex-col justify-center items-center pt-40 gap-10 pb-40">
                <div className="flex items-center flex-col gap-4 text-center justify-center">
                    <h2 className="text-4xl font-bold">NOSSO DIFERENCIAL</h2>
                    <div className="border-b-2 border-b-red-600 mb-2 w-14"></div>
                </div>
               <ul className="flex w-5/6 justify-center gap-2">
                    <li className="flex flex-col items-center text-center gap-2">
                        <GoPerson className="w-16 h-16 text-red-600"/>
                        <h4 className="font-bold text-lg">ATENDIMENTO</h4>
                        <p className="text-neutral-400 text-sm leading-6">Excelência no atendimento, nossa equipe técnica JC Oficina Mecânica estará a disposição para conversar sobre performances e carros!</p>
                    </li>
                    <li className="flex flex-col items-center text-center gap-2">
                        <LiaCogSolid className="w-16 h-16 text-red-600"/>
                        <h4 className="font-bold text-lg">SEGURANÇA</h4>
                        <p className="text-neutral-400 text-sm leading-6">Levamos a segurança a serio! Dentro da JC Oficina Mecânica trabalhamos com as melhores peças / oficiais disponíveis no mercado automobilístico.</p>
                    </li>
                    <li className="flex flex-col items-center text-center gap-2">
                        <GoTrophy className="w-16 h-16 text-red-600"/>
                        <h4 className="font-bold text-lg">QUALIDADE</h4>
                        <p className="text-neutral-400 text-sm leading-6">A equipe JC Oficina Mecânica possui know-how automobilística e sempre buscamos a qualidade em todos os sentidos.</p>
                    </li>
               </ul>
            </section>
            <Footer/>
        </>
    
    )
}