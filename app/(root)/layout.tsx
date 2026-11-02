import { Suspense } from "react";
import Header from "@/components/Header";
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

const AuthGuard = async ({ children }: { children : React.ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() });

    if(!session?.user) redirect('/sign-in');

    const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    }

    return (
        <main className="min-h-screen text-gray-400">
            <Header user={user} />

            <div className="container py-10">
                {children}
            </div>
        </main>
    )
}

const Layout = ({ children }: { children : React.ReactNode }) => {
    return (
        <Suspense fallback={null}>
            <AuthGuard>{children}</AuthGuard>
        </Suspense>
    )
}
export default Layout