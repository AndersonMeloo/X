"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export const SigninForm = () => {

    const router = useRouter()
    const [emailField, setEmailField] = useState()
    const [passwordField, setPasswordField] = useState()

    return (

        <>
            <input placeholder="Digite seu e-mail"/>
        </>
    )
}