"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { apiFetch } from "@/utils/api";

export const SigninForm = () => {

    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent) {

        event.preventDefault()
        setError(null)

        try {
            const data = await apiFetch("/auth/signin", {

                method: 'POST',
                body: JSON.stringify(form)
            })

            localStorage.setItem("token", data.token)
            window.location.href = '/home'
        } catch (err: any) {
            setError(err.message)
        }
    }

    // const router = useRouter()
    // const [emailField, setEmailField] = useState('')
    // const [passwordField, setPasswordField] = useState('')

    // const handleEnterButton = () => {
    //     router.replace('/home')
    // }

    return (

        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    placeholder="Digite seu e-mail"
                    value={form.email}
                    onChange={val => setForm({ ...form, email: val })}
                    required
                />

                <Input
                    placeholder="Digite sua senha"
                    value={form.password}
                    onChange={val => setForm({ ...form, password: val })}
                    password
                    required

                />

                {error &&
                    <div className="text-red-500 mt-2">
                        <p>Senha ou E-mail incorretas</p>
                    </div>
                }

                <Button
                    label="Entrar"
                    type="submit"
                    size={1}
                />
            </form>
        </>
    )
}