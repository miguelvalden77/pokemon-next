import {Text} from "@nextui-org/react"
import Link from "next/link"


export const Navbar = () =>{

    return(
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2rem"
        }}>
            <Link href={"/"}>
                <Text color="white">Pokemons</Text>
            </Link>

            <Link href={"/favoritos"}>
                <Text color="white">Favoritos</Text>
            </Link>
        </nav>
    )

}
