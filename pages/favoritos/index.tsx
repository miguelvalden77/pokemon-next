import { Layout } from "@/components/layouts"
import { NoFavs } from "@/components/ui"
import { Card, Grid } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { PokemonFavoritos } from "@/components/pokemon"


const FavoritosPage = ()=>{

    const [pokemons, setPokemons] = useState<number[]>([])

    useEffect(()=>{
        getPokemonFavs()
    }, [])

    const getPokemonFavs = () =>{
        setPokemons(JSON.parse(localStorage.getItem("favorito") || "[]"))
    }

    return(
        <Layout>
                {
                    pokemons.length == 0 
                    ? (<NoFavs/>)
                    : <PokemonFavoritos pokemons={pokemons}/>
                }
        </Layout>
    )
}

export default FavoritosPage