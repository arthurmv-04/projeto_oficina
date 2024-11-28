"use client"
import { MdOutlineMail } from "react-icons/md";
import { PiPhoneCall } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { FaCogs } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { FaCar } from "react-icons/fa6";
import { GiSteeringWheel } from "react-icons/gi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoArrowUp } from "react-icons/io5";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";





import Image from "next/image";
import Link from "next/link";
import Form from "next/form";

import { useState, useEffect} from "react";


import StickySection from "./components/sticky_section";



export default function Homepage(){
    const [comentario, setComentario] = useState("");
    const [nome, setNome] = useState("");
    const [comentarios, setComentarios] = useState([]); 
    const [adminLoggedIn, setAdminLoggedIn] = useState(false); 
    const [activeIndex, setActiveIndex] = useState(null); 
    const [servicos, setServicos] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("todos");



    const handleToggle = (index) => {
        // Alterna entre abrir/fechar o item
        setActiveIndex(activeIndex === index ? null : index);
      };

    const faq = [
        {
          pergunta: "Manutenção em suspensão?",
          resposta: "Muitas vezes, buracos e imperfeições nas estradas podem fazer um deslocamento do ponto de fixação original do seu automóvel, causando perda de controle e dirigibilidade. Esse problema perigoso pode ser evitado fazendo uma revisão no sistema de suspensão em uma boa oficina mecânica que faz manutenção preventiva. Venha para a MadeForStreet efetuar uma manutenção preventiva!",
        },
        {
          pergunta: "Manutenção preventiva?",
          resposta: "Primeiro de tudo, a falta de uma manutenção adequada do carro é uma das principais causas de acidentes com veículos pelas estradas e avenidas brasileiras. Para além de um carro quebrado em uma avenida causar um grande congestionamento, o mal funcionamento num veículo causado por falta de cuidados mecânicos pode causar grande destruição e até mesmo mortes. Então, manter o seu veículo em bom estado não é só uma questão de conforto pessoal, mas de segurança individual e pública.",
        },
        {
          pergunta: "Troca de óleo?",
          resposta: "A troca de óleo é um aspecto importantíssimo avaliado na manutenção contínua do seu veículo. Manter a qualidade do óleo é garantir a lubrificação das peças e um bom funcionamento geral do carro. Fique atento: o óleo lubrificante e o filtro de óleo do seu carro devem ser trocados de acordo com a montadora do seu veículo. Esse período pode variar de 10 mil km ou 6 meses de uso, e é imprescindível que você não deixe o nível do óleo cair abaixo do ideal. Lembre-se, a checagem constante faz parte da prevenção para problemas mais sérios.",
        },
      ];
    useEffect(() => {
        const isAdmin = localStorage.getItem("adminLoggedIn") === "true";
        setAdminLoggedIn(isAdmin);

        fetchComentarios(); 
        fetchServicos();
        
    }, []);

    const fetchServicos = async (categoria = "todos") => {
        try {
            // Determina a URL base
            let url = "https://darkseagreen-mule-233162.hostingersite.com/api/servicos";
        
            // Se a categoria não for 'todos', adiciona o parâmetro na URL
            if (categoria !== "todos") {
                url += `?categoria=${encodeURIComponent(categoria.toLowerCase())}`;
            }
        
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        
            if (!response.ok) {
                const errorData = await response.text(); // Lê a resposta como texto se não for OK
                console.error(`Erro: ${errorData}`);
                return;
            }
        
            // Verifica se a resposta tem conteúdo
            const responseBody = await response.text();
            if (responseBody) {
                const data = JSON.parse(responseBody); // Tenta analisar como JSON
                setServicos(data.servicos);
            } else {
                console.error("Resposta vazia");
            }
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
        }
    };
    

    const handleCategoriaClick = (categoria) => {
        setCategoriaSelecionada(categoria); // Atualiza a categoria no estado
        fetchServicos(categoria); // Faz a requisição para buscar serviços
    };

    const fetchComentarios = async () => {
        try {
            const response = await fetch('https://darkseagreen-mule-233162.hostingersite.com/api/comentarios');
            if (!response.ok) {
                throw new Error(`Erro ao buscar comentários: ${response.statusText}`);
            }
            const data = await response.json();
            setComentarios(data.comentarios || []); // Atualizar o estado com os comentários
        } catch (error) {
            console.error(error);
        }
    };


    const handleDelete = async (id) => {
        const confirmDelete = confirm("Tem certeza que deseja deletar este comentário?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://darkseagreen-mule-233162.hostingersite.com/api/comentarios/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Erro ao deletar comentário: ${response.statusText}`);
            }
            fetchComentarios();
        } catch (error) {
            console.error("Erro ao deletar comentário:", error);
        }
    };

       
    const handleSubmit = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comentario, nome }),
        };

        try {
            const response = await fetch('https://darkseagreen-mule-233162.hostingersite.com/api/comentarios', options);
            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);
            setComentario("");
            setNome("");
            fetchComentarios(); // Atualiza os comentários após envio
        } catch (error) {
            console.error('Erro ao enviar:', error);
        }
    }

    return (
        <>
            <header className="w-full relative bg-black/50 text-white p-3" style={{height: '700px'}}>
                <ul className="flex justify-center gap-16 w-full">
                    <li className="flex flex-col">
                        <p className="text-gray-300 ml-10 text-xs">Telefone</p>
                        <div className="flex items-center gap-2">
                            <PiPhoneCall className="w-8 h-8 text-rose-600" />
                            <p className="font-bold">(51) 9 9438-6958</p>
                        </div>
                    </li>
                    <li className="flex flex-col">
                        <p className="text-gray-300 ml-10 text-xs">Email</p>
                        <div className="flex items-center gap-2">
                            <MdOutlineMail className="w-8 h-8 text-rose-600" />
                            <p className="font-bold">jcoficinamec@gmail.com</p>
                        </div>    
                    </li>
                    <li className="flex flex-col">
                        <p className="text-gray-300 ml-10 text-xs">Endereço</p>
                        <div className="flex items-center gap-2">
                            <SlLocationPin className="w-8 h-8 text-rose-600" />
                            <p className="font-bold">Rua Claristino Andrades, 328 - Viamão</p>
                        </div>
                    </li>
                </ul>
                <Image src="/fundo.jpg" width={1800} height={100} alt="carro com adesivo 'Deus é fiel' na traseira se preparando para a arrancada em uma pista" className="-z-50 absolute top-0 left-0 object-cover w-full h-full"/>
            </header>
            <StickySection/>
            <section className="flex bg-neutral-800 text-white justify-between p-16">
                <div className="w-2/4 flex flex-col text-center items-center">
                    <h2 className="text-4xl mb-5 w-2/4">PROCURANDO <span className="font-bold text-5xl">PERFORMANCE?</span></h2>
                    <p className="text-neutral-400 text-sm font-light w-9/12 leading-6">Traga seu veículo para a JC Oficina Mecânica e surpreenda-se com a qualidade dos nossos serviços e padrão de atendimento. Visamos sempre a alta performance automotiva.</p>
                </div>
                    <ul className="w-2/4 flex flex-col gap-10">
                        <li>	
                            <div className="flex items-center gap-5 mb-5">
                                <div className="bg-red-600 w-10 h-10 flex items-center justify-center rounded">            <FaChartLine className="w-6 h-6 font-bold"/> 
                                </div>
                                <h6 className="font-bold">DIAGNÓSTICOS E SOLUÇÕES</h6>
                            </div> 
                            <p className="text-sm text-neutral-400 font-light w-9/12 leading-6">
                                Na JC Oficina Mecãnica a experiência é premium! Oferecemos serviços especializados em diagnósticos automotivos, utilizando tecnologia de ponta para identificar rapidamente quaisquer falhas ou problemas em seu veículo. Nossa equipe oferece soluções precisas e eficientes para garantir o desempenho e a segurança do seu carro. Buscamos sempre a melhor experiência para nossos clientes, cuidando do seu veículo como se fosse nosso.

                            </p>
                        </li>
                        <li>	
                            <div className="flex items-center gap-5 mb-5">
                                <div className="bg-red-600 w-10 h-10 flex items-center justify-center rounded">            
                                    <FaCogs className="w-6 h-6 font-bold"/> 
                                </div>
                                <h6 className="font-bold">MANUTENÇÃO PREVENTIVA</h6>
                            </div> 
                            <p className="text-sm text-neutral-400 font-light w-9/12 leading-6">
                            Faça a revisão do seu veículo, seja ele nacional ou importado! Trabalhamos com peças originais, abrangendo toda a linha nacional e importada. Atendemos pessoas físicas e jurídicas.
                            </p>
                        </li>
                        <li>	
                            <div className="flex items-center gap-5 mb-5">
                                <div className="bg-red-600 w-10 h-10 flex items-center justify-center rounded">            
                                    <FaRegClock className="w-6 h-6 font-bold"/> 
                                </div>
                                <h6 className="font-bold">GASOLINA OU ETANOL</h6>
                            </div> 
                            <p className="text-sm text-neutral-400 font-light w-9/12 leading-6">
                                Somos especialistas em tudo.... Manutenção e preparação completa de Motores; Câmbios; Suspensão; Freios; Injeção Programável .                           
                            </p>
                        </li>
                        <li>	
                            <div className="flex items-center gap-5 mb-5">
                                <div className="bg-red-600 w-10 h-10 flex items-center justify-center rounded">            
                                    <FaCar className="w-6 h-6 font-bold"/> 
                                </div>
                                <h6 className="font-bold">NOSSOS NÚMEROS</h6>
                            </div> 
                            <p className="text-sm text-neutral-400 font-light w-9/12 leading-6">                          
                               +10 Anos de Experiência; +5mil Clientes Atendidos;
                            </p>
                        </li>
                    </ul>
            </section>
            <section className="bg-neutral-800 text-white flex flex-col justify-center items-center border-t-red-600 border-t p-10 gap-10">
                <div className="flex items-center flex-col gap-5 text-center justify-center">
                    <GiSteeringWheel className="w-16 h-16"/>
                    <h2 className="text-4xl font-bold">LOCALIZAÇÃO</h2>
                    <div className="border-b-2 border-b-red-600 mb-2 w-14"></div>
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.5549455416235!2d-51.01652902465361!3d-30.078289174906548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95198346ddd6dbaf%3A0x9a5be4e77717ee01!2sJC%20Motorsports%20Oficina%20mec%C3%A2nica!5e0!3m2!1spt-PT!2sbr!4v1730630089711!5m2!1spt-PT!2sbr" width="600" height="450" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>
            <section className="bg-neutral-800 text-white flex flex-col justify-center items-center border-t-red-600 border-t p-10 gap-10">
                <div className="flex items-center flex-col gap-4 text-center justify-center">
                    <GiSteeringWheel className="w-16 h-16"/>
                    <h2 className="text-4xl font-bold">ALGUNS SERVIÇOS</h2>
                    <div className="border-b-2 border-b-red-600 mb-2 w-14"></div>
                </div>
                <div>
                <ul className="flex justify-evenly w-full">
                    {["TODOS", "DIAGNÓSTICOS", "MANUTENÇÃO", "MOTORES", "TURBO"].map((categoria) => (
                        <li
                            key={categoria}
                            className={`font-bold cursor-pointer px-4 py-2 ${
                                categoriaSelecionada === categoria ? "text-red-600" : "text-white"
                            }`}
                            onClick={() => handleCategoriaClick(categoria)}
                            style={{ minWidth: "100px", textAlign: "center" }} // Garante uma largura mínima para cada item
                        >
                            {categoria}
                        </li>
                    ))}
                </ul>
                <div className="mt-5">
                    {servicos.length > 0 ? (
                        <ul className="flex items-center flex-wrap gap-5 w-full">
                            {servicos.map((servico) => (
                                <li key={servico.id} className="">
                                    <Image
                                        src={`https://darkseagreen-mule-233162.hostingersite.com/api${servico.imagem}`} 
                                        alt={servico.nome}
                                        width={200}
                                        height={200}
                                        className="object-cover w-full"
                                    />      
                                </li>
                            ))}
                        </ul>
                        ) : (
                        <p className="text-gray-500">
                            `Nenhum serviço encontrado para a categoria.`
                        </p>
                    )}
                </div>
            </div>
        </section>
            <section className="bg-neutral-800 text-white flex justify-center items-center border-t-red-600 border-t p-10 gap-10">
                <div className="w-2/4 flex flex-col gap-5">
                    <h3 className="text-xl font-bold">NOSSA MISSÃO</h3>
                    <div className="border-b-2 border-b-red-600 mb-2 w-14"></div>
                    <p className="text-sm text-neutral-400 font-light leading-6 w-3/4">Dentro da JC Oficina Mecânica temos como missão solucionar problemas em veículos automotivos com qualidade e confiança, buscando inovações contínuas de novas tecnologias de ponta, atendimento personalizado, foco em performance automotiva e garantia nos serviços prestados. </p>
                    <button className="border-red-600 border-2 w-52 p-2 font-bold text-sm mt-5 rounded"><Link href="https://web.whatsapp.com/send?phone=555194386958&text=Olá!%20Gostaria%20de%20fazer%20um%20agendamento!" target="_blank"/>AGENDAR VISITA</button>
                </div>
                <div  className="flex flex-col gap-5">
                    <h3 className="text-xl font-bold">DUVIDAS FREQUENTES</h3>
                    <div className="border-b-2 border-b-red-600 mb-2 w-14"></div>
                    <ul className="flex flex-col gap-5">
                        {faq.map((item, index) => (
                        <li
                            key={index}
                            className="border-2 border-stone-500 flex flex-col p-5 w-96 cursor-pointer"
                            onClick={() => handleToggle(index)} // Alterna o estado ao clicar
                        >
                            <div className="flex items-center justify-between">
                                <FaRegQuestionCircle className="w-5 h-5 font-bold text-red-600" />
                                <h4>{item.pergunta}</h4>
                                {activeIndex === index ? (
                                    <MdOutlineKeyboardArrowUp />
                                ) : (
                                    <MdOutlineKeyboardArrowDown />
                                )}
                            </div>
                                {activeIndex === index && (
                                <div className="mt-5 text-sm text-neutral-300 leading-6">
                                    {item.resposta}
                                </div>
                            )}
                        </li>
        ))}
                    </ul>
                </div>
            </section>
            <section className="bg-neutral-800 text-white flex flex-col justify-center items-center border-t-red-600 border-t p-10 gap-10">
                <div className="flex items-center flex-col gap-5 text-center justify-center">
                    <GiSteeringWheel className="w-16 h-16" />
                    <h2 className="text-4xl font-bold">COMENTÁRIOS</h2>
                    <div className="border-b-2 border-b-red-600 mb-2 w-14"></div>
                </div>
                <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <label>Seu nome</label>
                    <input
                        type="text"
                        placeholder="Seu Nome (opcional)"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-96 bg-stone-500 p-2 border-red-600 rounded text-sm mt-2"
                    />
                    <label>Comentário</label>
                    <textarea
                        name="comentario"
                        placeholder="Comentário"
                        className="w-96 resize-none bg-stone-500 p-5 border-red-600 rounded text-sm h-36"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    />
                    <button type="submit" className="border-red-600 border-2 w-52 p-2 font-bold text-sm mt-5 rounded">
                        ENVIAR COMENTÁRIO
                    </button>
                </Form>
                <div className="w-full flex flex-col items-center gap-5">
                    {comentarios.map((comentario, index) => (
                        <div key={index} className="bg-stone-700 p-5 rounded w-96 flex flex-col gap-5">
                            <div>
                                <p className="font-bold">{comentario.nome || "Anônimo"}</p>
                                <p className="leading-6 text-sm mt-2">{comentario.comentario}</p>
                            </div>
                            {adminLoggedIn && (
                                <button
                                    onClick={() => handleDelete(comentario.id)}
                                    className="bg-red-600 p-2 text-white rounded w-24"
                                >
                                    Deletar
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <footer className="border-t-2 border-t-red-600 bg-zinc-900 flex justify-between text-stone-500 p-5 items-center">
                <p className="text-sm">© 2024 JC Oficina Mecânica</p>
                <div className="flex gap-5">
                    <Link href="https://www.facebook.com/Jcoficinamec?locale=pt_BR" target="_blank">
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
            </footer>
        </>
    )
}