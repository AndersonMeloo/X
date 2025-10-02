"use client"
import Link from "next/link"
import { useAuthUser } from "@/hooks/useAuth"

export const NavMyProfile = () => {

    const { userData, loading } = useAuthUser()

    if (loading) return <div>Carregando...</div>
    if (!userData) return <div>Erro ao carregar usuário</div>

    // Desestruturando o usuário para facilitar o acesso
    const { user } = userData

    return (
        <div className="flex items-center">
            
            {/* Avatar */}
            <div className="w-10 h-10 mr-2 rounded-full overflow-hidden">
                <Link href={`/${user.slug}`}>
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                    />
                </Link>
            </div>

            {/* Nome e slug */}
            <div className="flex-1 min-w-0">
                <Link href={`/${user.slug}`} className="block truncate font-medium">
                    {user.name}
                </Link>
                <div className="truncate text-sm text-gray-400">
                    @{user.slug}
                </div>
            </div>
        </div>
    )
}
