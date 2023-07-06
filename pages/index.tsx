import { Button, Card, Grid, Row, Text } from "@nextui-org/react";
import {Layout} from "../components/layouts";
import Image from "next/image";
import { GetStaticProps, NextPage } from "next";
import {pokemonApi} from "../api"
import { Pokemon, PokemonList } from "@/interfaces";
import axios from "axios";
import { PokemonCard } from "@/components/pokemon";


interface Props {
  pokemons: Pokemon[]
}

const Home: NextPage<Props> = ({pokemons}) => {
  return (
    <Layout>
      <Grid.Container gap={2} justify="flex-start">
      {
        pokemons.map((pokemon: Pokemon) =>(
          <PokemonCard pokemon={pokemon} index={pokemon.id} key={pokemon.id}/>
        ))
      }
      </Grid.Container>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (params: any) => {

  const response = await pokemonApi<PokemonList>("pokemon?limit=151&offset=0")

  const pokemons = response.data.results.map((pokemon, index) =>{
    return {
      name: pokemon.name, 
      id: index + 1, 
      url: pokemon.url,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
    }
  })

  return {
    props : {
      pokemons
    }
  }

}

export default Home