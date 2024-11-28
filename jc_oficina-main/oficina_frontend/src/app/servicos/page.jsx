"use client";

import { useState, useEffect } from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Image from "next/image";
import Link from "next/link";

export default function Servicos() {
    const [adminLoggedIn, setAdminLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState(""); // Adicionado para a categoria
    const [imagem, setImagem] = useState(null); // Adicionado para a imagem
    const [currentServiceId, setCurrentServiceId] = useState(null);
    const [servicos, setServicos] = useState([]);

    useEffect(() => {

        const isAdmin = localStorage.getItem("adminLoggedIn") === "true";
        setAdminLoggedIn(isAdmin);

        const fetchServicos = async () => {
            try {
                const response = await fetch("https://darkseagreen-mule-233162.hostingersite.com/api/servicos", {
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
        
        
        fetchServicos();
    }, []);

    const handleAddService = async () => {
        // Transformar categoria para minúsculas antes de incluir no objeto            // Criar um FormData para enviar os dados
            const formData = new FormData();
            
            // Adicionar os campos de dados no FormData
            formData.append("nome", nome);
            formData.append("descricao", descricao);
            formData.append("categoria", categoria);
            
            // Se a imagem foi selecionada, adiciona ao FormData
            if (imagem) {
                formData.append("imagem", imagem);
            }
        
            try {
                const response = await fetch("https://darkseagreen-mule-233162.hostingersite.com/api/servicos", {
                    method: "POST",
                    headers: {
                        // Não é necessário definir Content-Type quando usamos FormData
                        // O navegador se encarrega de definir o tipo correto (multipart/form-data)
                    },
                    body: formData,
                });
        
                const data = await response.json();
        
                if (response.ok) {
                    alert("Serviço adicionado com sucesso!");
                    setShowModal(false);
                    setServicos([data.servico, ...servicos]);
                } else {
                    alert(`Erro: ${data.mensagem}`);
                }
            } catch (error) {
                console.error("Erro ao adicionar serviço:", error);
            }
    
    }
        
    

    const handleEditService = async () => {

        if (!nome || !descricao || !categoria) {
            alert("Nome, descrição e categoria são obrigatórios.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('descricao', descricao);
            formData.append('categoria', categoria);
            if (imagem) {
                formData.append('imagem', imagem);
            }


            const response = await fetch(`https://darkseagreen-mule-233162.hostingersite.com/api/servicos/${currentServiceId}`, {
                method: "POST",
                body: formData,

            });

            const data = await response.json();

            if (response.ok) {
                alert("Serviço atualizado com sucesso!");
                setServicos(
                    servicos.map((servico) =>
                        servico.id === currentServiceId ? data.servico : servico
                    )
                );
                setShowModal(false);
                setIsEditing(false);
                setCurrentServiceId(null);

            } else {
                alert(`Erro: ${data.mensagem}`);
            }
        } catch (error) {
            console.error("Erro ao editar serviço:", error);
        }
    };

    const handleDeleteService = async (id) => {
        if (!confirm("Tem certeza que deseja excluir este serviço?")) return;

        try {
            const response = await fetch(`https://darkseagreen-mule-233162.hostingersite.com/api/servicos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                alert("Serviço excluído com sucesso!");
                setServicos(servicos.filter((servico) => servico.id !== id));
            } else {
                alert(`Erro: ${data.mensagem}`);
            }
        } catch (error) {
            console.error("Erro ao deletar serviço:", error);
        }
    };

    const openEditModal = (servico) => {
        setNome(servico.nome);
        setDescricao(servico.descricao);
        setCategoria(servico.categoria); // Preenche a categoria
        setImagem(null); // Limpa a imagem anterior
        setCurrentServiceId(servico.id);
        setIsEditing(true);
        setShowModal(true);
    };

    return (
        <>
            <Header />
            <section className="flex justify-center items-center flex-col relative bg-zinc-900">
                <Image
                    src="/fundo_servicos.jpg"
                    width={700}
                    height={50}
                    alt="audi a3 98 correndo na estrada"
                    className="opacity-50"
                />
                <div className="absolute text-white text-center bottom-9">
                    <p className="text-lg">
                        <Link href="/">Início</Link> / Serviços
                    </p>
                    <h2 className="text-6xl font-bold">NOSSOS SERVIÇOS</h2>
                </div>
            </section>

            <section className="p-4 bg-zinc-900">
                {adminLoggedIn && (
                    <div className="text-right">
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded"
                            onClick={() => {
                                setShowModal(true);
                                setIsEditing(false);
                                setNome("");
                                setDescricao("");
                                setCategoria("");
                                setImagem(null);
                            }}
                        >
                            Adicionar Serviço
                        </button>
                    </div>
                )}

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded w-96">
                            <h2 className="text-xl font-bold mb-4">
                                {isEditing ? "Editar Serviço" : "Adicionar Serviço"}
                            </h2>
                            <input
                                type="text"
                                placeholder="Nome do Serviço"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-full p-2 border mb-2 text-black"
                            />
                            <textarea
                                placeholder="Descrição do Serviço"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                className="w-full p-2 border mb-2 text-black"
                            ></textarea>
                            <select
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                className="w-full p-2 border mb-2 text-black"
                            >
                                <option value="">Selecione a Categoria</option>
                                <option value="diagnósticos">Diagnósticos</option>
                                <option value="manutenção">Manutenção</option>
                                <option value="motores">Motores</option>
                                <option value="turbo">Turbo</option>
                            </select>
                            <input
                                type="file"
                                onChange={(e) => setImagem(e.target.files[0])}
                                className="w-full p-2 border mb-2 text-black"
                            />
                            <div className="flex justify-between">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={isEditing ? handleEditService : handleAddService}
                                >
                                    {isEditing ? "Salvar Alterações" : "Salvar"}
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-16">
                    {servicos.map((servico) => (
                        <div key={servico.id} className=" p-4 flex flex-col items-center justify-center rounded shadow text-white text-center">
                            {servico.imagem && (
                                <div className="w-full">
                                    <Image
                                        src={`https://darkseagreen-mule-233162.hostingersite.com/api${servico.imagem}`}  // Remove a lógica extra
                                        alt={servico.nome}
                                        width={200}
                                        height={200}
                                        className="object-cover w-full"
                                    />
                                </div>
                            )}
                            <h3 className="text-xl font-bold mt-10 mb-5">{servico.nome}</h3>
                            <p className="text-gray-300 font-thin text-sm leading-6">{servico.descricao}</p>
                        
                            {adminLoggedIn && (
                                <div className="flex gap-2 mt-10">
                                    <button
                                        className="bg-orange-500 text-white px-4 py-2 rounded"
                                        onClick={() => openEditModal(servico)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleDeleteService(servico.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
}
