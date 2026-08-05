import { useState } from "react";
import logo from "../assets/logo.svg";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting login:", { email, password });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 px-4">
            {/* Logo */}
            <div className="flex flex-col items-center gap-1">
                <img src={logo} className="w-56 h-auto" alt="MindShare Logo" />
            </div>

            {/* Main Access Card */}
            <Card className="w-full max-w-[400px] rounded-2xl bg-white border border-zinc-200/80 shadow-sm p-6">
                <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-xl font-bold text-zinc-900 tracking-tight">
                        Acesse a plataforma
                    </CardTitle>
                    <CardDescription className="text-sm text-zinc-500 mt-1.5">
                        Entre usando seu e-mail e senha cadastrados
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="text-xs font-semibold text-zinc-700">
                                E-mail
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="exemplo@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-10 bg-zinc-50 border-zinc-200 rounded-lg placeholder:text-zinc-400 text-zinc-900 focus-visible:ring-violet-500/25 focus-visible:border-violet-500 focus:bg-white transition-all px-3"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password" className="text-xs font-semibold text-zinc-700">
                                Senha
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-10 bg-zinc-50 border-zinc-200 rounded-lg placeholder:text-zinc-400 text-zinc-900 focus-visible:ring-violet-500/25 focus-visible:border-violet-500 focus:bg-white transition-all px-3"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-10 mt-2 bg-violet-700 hover:bg-violet-800 text-white font-medium rounded-lg transition-colors cursor-pointer"
                        >
                            Entrar
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Register Prompt Card */}
            <Card className="w-full max-w-[400px] rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-sm p-6">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-base font-semibold text-zinc-900">
                        Ainda não tem uma conta?
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500 mt-1">
                        Cadastre agora mesmo
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Button variant="outline" className="w-full">
                        <Link to="/signup"> Criar conta </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
