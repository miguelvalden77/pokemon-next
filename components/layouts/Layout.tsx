import Head from "next/head";
import { FC } from "react";
import { Navbar } from "../ui";

interface Props {
    children: JSX.Element[] | JSX.Element,
    title?: string
}

export const Layout: FC<Props> = ({children, title}) =>{

    return(
        <>
            <Head>
                <title>{title || "Pokemon App"}</title>
                <meta name="description" content="Aplicación de pokemon para los fans" />
                <meta name="author" content="Miguel Ángel" />
            </Head>
            <Navbar/>
            <main>
                {children}
            </main>
        </>
    )

}
