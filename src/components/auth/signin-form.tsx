"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const SigninForm = () => {

    const router = useRouter()
    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    const handleEnterButton = () => {
        router.replace('/home')
    }

    return (

        <>
            <Input
                placeholder="Digite seu e-mail"
                value={emailField}
                onChange={text => setEmailField(text)}
            />

            <Input
                placeholder="Digite sua senha"
                value={passwordField}
                onChange={text => setPasswordField(text)}
                password
            />

            <Button
                label="Entrar"
                onClick={handleEnterButton}
                size={1}
            />
        </>
    )
}