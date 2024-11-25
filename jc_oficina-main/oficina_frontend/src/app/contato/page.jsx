"use client"

import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

import Image from "next/image";
import Link from "next/link";

import { MdOutlineMail } from "react-icons/md";
import { PiPhoneCall } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";

export default function Contato(){

    return(
        <>
            <Header/>
            <section className="flex justify-center items-center flex-col relative bg-zinc-900">
                <Image src="/fundo_servicos.jpg" width={700} height={50} alt="audi a3 98 correndo na estrada" className="opacity-50"/>
                <div className="absolute text-white text-center bottom-9">
                    <p className="text-lg"> <Link href="/">Início</Link> / Contato</p>
                    <h2 className="text-6xl font-bold">CONTATO</h2>
                </div>
            </section>
            <section className="bg-zinc-800 text-white flex pt-20 justify-center items-center pb-20">
                <div className="flex flex-col gap-5 w-2/4 items-center justify-center">
                    <h3 className="text-3xl font-bold">Fale com a JC Oficina Mecânica</h3>
                    <p className="text-sm text-neutral-400 w-3/4 leading-6 mb-5">Caso você tenha alguma duvida ou sugestão, você pode entrar em contato por telefone, email e whatsapp:</p>
                    <ul className="flex flex-col gap-5">
                        <li className="flex items-center gap-5">
                            <PiPhoneCall className="w-7 h-7 text-red-600"/>
                            <div className="flex flex-col gap-2">
                                <p className="text-neutral-400 text-sm">Telefone e Whatsapp</p>
                                <p className="font-bold">(51) 9 9438-6958</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-5">
                            <SlLocationPin className="w-7 h-7 text-red-600"/>
                            <div className="flex flex-col gap-2">
                            <p className="text-neutral-400 text-sm">Endereço</p>
                            <p className="font-bold">Rua Claristino Andrades, 328 - Viamão</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-5">
                            <MdOutlineMail className="w-7 h-7 text-red-600"/>
                            <div className="flex flex-col gap-2">
                            <p className="text-neutral-400 text-sm">E-mail</p>
                            <p className="font-bold">jcoficinamec@gmail.com</p>

                            </div>
                        </li>
                    </ul>
                    <div className="flex gap-5 mt-5">
                        <Link href="https://www.facebook.com/Jcoficinamec?locale=pt_BR" target="_blank" className="hover:text-red-600">
                            <div className="border-2 border-stone-500 p-2 flex items-center rounded">
                                <TiSocialFacebook />
                            </div>
                        </Link>
                        <Link href="https://www.instagram.com/jc_oficinamec/" target="_blank" >
                            <div className="border-2 border-stone-500 p-2 flex items-center rounded">
                                <TiSocialInstagram />
                            </div>
                        </Link>
                    </div>  
                </div>
            </section>
            <Footer/>
        </>
    
    )
}