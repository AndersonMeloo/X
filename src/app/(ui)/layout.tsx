import { NavItem } from "@/components/nav/nav-item"
import { NavLogout } from "@/components/nav/nav-logout"
import { NavMyProfile } from "@/components/nav/nav-myprofile"
import { Logo } from "@/components/ui/logo"
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons"

type Props = {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {

    return (

        <>
            <main className="min-h-screen flex justify-center mx-auto max-w-7xl">

                <section className="hidden lg:flex flex-col sticky top-0 h-screen w-72 px-3 border-r-2 border-gray-900">
                    <div className="flex-1 mt-6">
                        <Logo size={24} />
                        <nav className="mt-11">

                            <NavItem
                                href="/home"
                                icon={faHouse}
                                label="Página inicial"
                            />

                            <NavItem
                                href="/profile"
                                icon={faUser}
                                label="Meu Perfil"
                            />
                        </nav>
                    </div>

                    <div className="mb-6 flex flex-col gap-4">
                        <NavLogout />
                        <NavMyProfile />
                    </div>

                </section>

                <section className="flex-1 max-w-lg">
                    {children}
                </section>

                <aside className="hidden lg:flex flex-col gap-6 sticky top-0 h-fit w-96 px-8 py-6 border-l-2 border-gray-900">
                    Direita
                </aside>
            </main>
        </>
    )
}   