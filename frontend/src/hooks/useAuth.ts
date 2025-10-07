"use client"
import { useEffect, useState } from "react"
import { apiFetch } from "@/utils/api"
import { AuthUserData } from "@/types/auth"

export function useAuthUser() {

    const [userData, setUserData] = useState<AuthUserData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const token = localStorage.getItem("token")
        if (!token) {
            setLoading(false)
            return
        }

        async function fetchUser() {

            try {
                const slug = localStorage.getItem("slug")
                if (!slug) return

                // Tipando explicitamente o retorno
                const data: AuthUserData = await apiFetch(`/user/${slug}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                })

                setUserData(data) // salva todo o objeto retornado

            } catch (err) {
                console.error("Erro ao carregar usuário:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    return { userData, loading } // retornando o objeto completo
}
