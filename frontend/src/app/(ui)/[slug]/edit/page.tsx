'use client';

import { ProfileFeed } from "@/components/profile/profile-feed";
import { Button } from "@/components/ui/button";
import { GeneralHeader } from "@/components/ui/general-header";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { user } from "@/data/user";
import { useAuthUser } from "@/hooks/useAuth";
import { faCamera, faLink, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { use, useState } from "react";
import { user as staticUser } from "@/data/user"; // cover estático
import { apiFetch } from "@/utils/api";

export default function Page() {

    const { userData, loading } = useAuthUser();

    // Guarda o que o usuário digita
    const [form, setForm] = useState({
        name: '',
        bio: '',
        link: ''
    })

    const [message, setMessage] = useState<string | null>(null) // Mensagem de Sucesso/Error
    const [saving, setSaving] = useState(false) // Desabilita o botão enquanto salva

    const isMe = true;

    console.log(userData)

    if (loading) return <div>Carregando...</div>;
    if (!userData) return <div>Erro ao carregar usuário</div>;

    const { user } = userData;

    // Quando página carrega pega os dados alterados
    if (!form.name && user.name) {
        setForm({
            name: user.name,
            bio: user.bio || '',
            link: user.link || ''
        })
    }

    async function handleSalve() {

        setSaving(true)  // Desabilita o botão enquanto salva
        setMessage(null) // Limpa as mensagens antigas

        try {
            await apiFetch('/user', {
                method: 'PUT',
                body: JSON.stringify(form)
            })

            setMessage('Perfil atualizado com sucesso!')
        } catch (err: any) {
            console.log(err)
            setMessage(err.message || 'Erro ao atualizar perfil')
        } finally {
            setSaving(false)
        }
    }

    return (

        <div>
            <GeneralHeader backHref="/profile">
                <div className="font-bold text-lg">Editar perfil</div>
            </GeneralHeader>

            <section className="border-b-2 border-gray-900">

                <div
                    className="flex justify-center items-center gap-4 bg-gray-500 h-28 bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: `url(${staticUser.cover})` }}
                >
                    <div className="cursor-pointer bg-black/80 flex justify-center items-center size-12 rounded-full">
                        <FontAwesomeIcon icon={faCamera} className="size-6" />
                    </div>

                    <div className="cursor-pointer bg-black/80 flex justify-center items-center size-12 rounded-full">
                        <FontAwesomeIcon icon={faXmark} className="size-6" />
                    </div>
                </div>

                <div className="-mt-12 px-6">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="size-24 rounded-full border border-solid border-white"
                    />

                    <div className="-mt-24 size-24 flex justify-center items-center">
                        <div className="cursor-pointer bg-black/80 flex justify-center items-center size-12 rounded-full">
                            <FontAwesomeIcon icon={faCamera} className="size-6" />
                        </div>
                    </div>
                </div>

            </section>

            <section className="p-6 flex flex-col gap-4">

                <label>
                    <p className="text-lg text-gray-500 mb-2">Nome
                        <Input
                            placeholder="Digite seu nome"
                            value={form.name}
                            // Usuário digita -> onChange pega o valor e atualiza o form
                            onChange={(val) => setForm({ ...form, name: val })}
                        />
                    </p>
                </label>

                <label>
                    <p className="text-lg text-gray-500 mb-2">Bio
                        <TextArea
                            placeholder="Descreva sobre você"
                            rows={4}
                            value={form.bio}
                            onChange={(val) => setForm({ ...form, bio: val })} // Atualiza o estado ao digitar
                        />
                    </p>
                </label>

                <label>
                    <p className="text-lg text-gray-500 mb-2">Link
                        <Input
                            placeholder="Digite um link"
                            value={form.link}
                            onChange={(val) => setForm({ ...form, link: val })}
                        />
                    </p>
                </label>

                <Button
                    label={saving ? 'Salvando...' : 'Salvar alterações'}
                    onClick={handleSalve}
                    size={1}
                    disable={saving} // Desabilita o botão enquanto salva
                />
                {message && (
                    <p className="text-center mt-3 text-gray-400 text-sm">{message}</p>
                )}

            </section>
        </div>
    )
}