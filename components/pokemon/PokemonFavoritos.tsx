import { Grid, Card } from "@nextui-org/react"
import {useRouter} from "next/router"
import { FC } from "react"

interface Props {
    pokemons: any
}

export const PokemonFavoritos: FC<Props> = ({pokemons}) => {

    const router = useRouter()

    const navigation = (id: number)=> router.push(`/pokemon/${id}`)

    return(
        <Grid.Container gap={2} direction="row" justify="flex-start">
        {
            pokemons.map((id: number)=>(
                <Grid onClick={()=> navigation(id)} xs={6} sm={3} md={2} lg={1} key={id}>
                    <Card isPressable isHoverable css={{padding: 10}}>
                        <Card.Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`} />
                    </Card>
                </Grid>
            ))
        }
        </Grid.Container>
    )

}