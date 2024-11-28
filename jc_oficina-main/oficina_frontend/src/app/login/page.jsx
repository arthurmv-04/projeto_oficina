"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importar o hook useRouter

import Link from "next/link";
import Form from "next/form";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Para armazenar a mensagem de erro


    const router = useRouter(); // Instanciar o useRouter

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Dados do login
        const loginData = { email, senha };

        try {
            const response = await fetch("https://darkseagreen-mule-233162.hostingersite.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Inclui cookies na requisição
                body: JSON.stringify(loginData),
            });

            const result = await response.json();

            if (response.ok) {
                // Login bem-sucedido
                console.log("Login realizado com sucesso!");

                // Salvar estado de admin no localStorage
                localStorage.setItem("adminLoggedIn", "true");

                // Redirecionar para a URL '/'
                router.push('/');
            } else {
                // Exibir mensagem de erro retornada pelo backend
                setErrorMessage(result.mensagem || "Erro ao fazer login");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setErrorMessage("Erro de comunicação com o servidor");
        }
    };

    return (
        <section className="bg-zinc-900 flex flex-col h-screen w-screen justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center w-96">
                <h2 className="text-xl font-bold mb-5">Login de Administrador</h2>
                <Form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <label>
                        Email:
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded" 
                            required 
                        />
                    </label>
                    <label>
                        Senha:
                        <input 
                            type="password" 
                            value={senha} 
                            onChange={(e) => setSenha(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded" 
                            required 
                        />
                    </label>
                    <button 
                        type="submit" 
                        className="bg-red-600 text-white p-3 rounded mt-4"
                    >
                        Entrar
                    </button>
                    <button 
                        type="button" 
                        className="mt-2 text-red-600"
                    >
                        <Link href="/">Voltar</Link>
                    </button>

                                    {/* Exibe a mensagem de erro se houver */}
                {errorMessage && (
                    <p className="text-red-600 mt-4">{errorMessage}</p>
                )}
                </Form>

            </div>
        </section>
    );
}
