import { pokemonApi } from "@/api"
import { Layout } from "@/components/layouts"
import { Pokemon } from "@/interfaces"
import { Button, Card, Container, Grid, Text } from "@nextui-org/react"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

interface Props {
    pokemon: any
}

const PokemonPage: NextPage<Props> = ({pokemon}) =>{

    const [isFav, setIsFav] = useState<boolean>(false)

    useEffect(()=>{
        getFavoritos()
    }, [])

    const isFavorito = (pokeArr: any) =>{
        if(pokeArr.includes(pokemon.id)){
            setIsFav(true)
            return
        }
            
        setIsFav(false)
    }
    
    const getFavoritos = ()=>{
        const parseArr = JSON.parse(localStorage.getItem("favorito") || "[]")
        isFavorito(parseArr)
    }

    
    const isFavToggle = ()=>{
        const favoritos = JSON.parse(localStorage.getItem("favorito") || "[]") || []
        favoritos.push(pokemon.id)
        const strFavoritos = JSON.stringify(favoritos)
        
        localStorage.setItem("favorito", strFavoritos)
        const parseArr = JSON.parse(localStorage.getItem("favorito") || "[]")
        
        isFavorito(parseArr)

        if(isFav) return

        confetti({
            angle: 90,
            spread: 60,
            particleCount: 65,
            origin: { y: 0.6 }
        });
        
    }

  

    return(
        <Layout title={pokemon.name}>
            <Grid.Container css={{marginTop: "5px"}} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isPressable css={{padding: "30px"}}>
                        <Card.Body>
                            <Card.Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} width={"100%"} height={200} alt={pokemon.name}/>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{display: "flex", justifyContent: "space-between"}}>
                            <Text h1>{pokemon.name}</Text>
                            <Button color={"gradient"} ghost onClick={isFavToggle}>
                                {isFav ? "Añadido" : "guardar en favoritos"}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites: </Text>
                            <Container direction="row" display="flex">
                                <Image src={pokemon.sprites.front_default}
                                alt={pokemon.name} width={100} height={100}/>

                                <Image src={pokemon.sprites.back_default}
                                alt={pokemon.name} width={100} height={100}/>

                                <Image src={pokemon.sprites.front_shiny}
                                alt={pokemon.name} width={100} height={100}/>

                                <Image src={pokemon.sprites.back_shiny}
                                alt={pokemon.name} width={100} height={100}/>
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>

            </Grid.Container>
        </Layout>
    )

}


export const getStaticPaths: GetStaticPaths = async (ctx)=>{

    const pokemonsIndex = [...Array(151)].map((pokemon, idx)=> `${idx + 1}`)

    return {
        paths: pokemonsIndex.map((index)=>({
            params: {index}
        })),
        fallback: false
    }

}


export const getStaticProps: GetStaticProps = async ({params})=>{

    const {index} = params as {index: string}

    const {data: {name, sprites, id}} = await pokemonApi.get<any>(`/pokemon/${index}`)

    return {
        props: {
            pokemon: {name, sprites, id}
        }
    }

}

export default PokemonPage