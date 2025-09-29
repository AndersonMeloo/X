"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { apiFetch } from "@/utils/api";

export const SignUpForm = () => {

    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent) {

        event.preventDefault()
        setError(null)

        try {
            await apiFetch('/auth/signup', {
                method: 'POST',
                body: JSON.stringify(form)
            })

            window.location.href = '/signin'
        } catch (err: any) {
            setError(err.message)
        }
    }

    // const router = useRouter()
    // const [nameField, setNameField] = useState('')
    // const [emailField, setEmailField] = useState('')
    // const [passwordField, setPasswordField] = useState('')

    // const handleEnterButton = () => {
    //     router.replace('/home')
    // }

    return (

        <>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    placeholder="Digite seu nome"
                    value={form.name}
                    onChange={val => setForm({ ...form, name: val })}
                    required
                />

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
                    required
                    password
                />

                <Button
                    label="Criar conta"
                    type="submit"
                    size={1}
                />

            </form>
        </>
    )
}