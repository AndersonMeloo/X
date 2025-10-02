"use client"

import { ProfileFeed } from "@/components/profile/profile-feed";
import { Button } from "@/components/ui/button";
import { GeneralHeader } from "@/components/ui/general-header";
import { useAuthUser } from "@/hooks/useAuth";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { user as staticUser } from "@/data/user"; // cover estático

export default function Page() {

    const { userData, loading } = useAuthUser();
    const isMe = true;

    console.log(userData)

    if (loading) return <div>Carregando...</div>;
    if (!userData) return <div>Erro ao carregar usuário</div>;

    const { user } = userData;

    return (

        <div>

            {/* Cabeçalho */}
            <GeneralHeader backHref="/">
                <div className="font-bold text-lg ">{user.name}</div>
                <div className="text-xs text-gray-500">{user.postCount}</div>
            </GeneralHeader>

            {/* Capa */}
            <section className="border-b-2 border-gray-900">
                <div
                    className="h-28 bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: `url(${staticUser.cover})` }}
                ></div>

                {/* Avatar e botão */}
                <div className="-mt-12 flex justify-between items-end px-6">
                    <img
                        src={user.avatar || "/default-avatar.jpg"}
                        alt={user.name}
                        className="size-24 rounded-full border-4 border-white"
                    />

                    <div className="w-32">
                        {isMe ? (
                            <Link href={`/${user.slug}/edit`}>
                                <Button label="Editar perfil" size={2} />
                            </Link>
                        ) : (
                            <Button label="Seguir" size={2} />
                        )}
                    </div>
                </div>

                {/* Informações do usuário */}
                <div className="px-6 mt-4">
                    <div className="text-xl font-bold">{user.name}</div>
                    <div className="text-gray-500">@{user.slug}</div>
                    <div className="py-5 text-lg text-stone-500">{user.bio}</div>

                    {user.link && (
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faLink} className="size-5" />
                            <Link href={user.link} target="_blank" className="text-blue-300">
                                {user.link}
                            </Link>
                        </div>
                    )}

                    <div className="my-5 flex gap-6">
                        <div className="text-xl text-gray-500">
                            <span className="text-white">99</span> Seguindo
                        </div>
                        <div className="text-xl text-gray-500">
                            <span className="text-white">99</span> Seguidores
                        </div>
                    </div>
                </div>
            </section>

            {/* Feed */}
            <ProfileFeed />
        </div>
    );
}
