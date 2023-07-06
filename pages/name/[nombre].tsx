import { pokemonApi } from "@/api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "@/components/layouts";
import { Grid, Card, Text, Button, Container } from "@nextui-org/react";
import Image from "next/image";
// import confetti from "canvas-confetti"
import { useState, useEffect } from "react";


interface Props{
    pokemon: any
}

const OnePokemon: NextPage<Props> = ({pokemon})=>{

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

        // confetti({
        //     angle: 90,
        //     spread: 60,
        //     particleCount: 65,
        //     origin: { y: 0.6 }
        // });
        
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


export const getStaticPaths: GetStaticPaths = async ()=>{

    const {data: {results}} = await pokemonApi("pokemon?limit=151&offset=0")
    const pokemonNames = results.map((pokemon: any)=>{
        return pokemon.name
    })

    return {
        paths: pokemonNames.map((nombre: string)=>{
            return {params: {nombre}}
        }),
        fallback: false
    }

}

export const getStaticProps: GetStaticProps = async ({params})=>{

    const {nombre} = params as {nombre: any}
    const {data: {sprites, name, id}} = await pokemonApi(`/pokemon/${nombre}`)
    console.log({nombre})

    return {
        props: {
            pokemon: {sprites, name, id}
        }
    }

}

export default OnePokemon