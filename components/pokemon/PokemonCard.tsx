import { Pokemon } from "@/interfaces"
import { Card, Grid, Row, Text } from "@nextui-org/react"
import {useRouter} from "next/router"
import { FunctionComponent } from "react"
import confetti from "canvas-confetti"

interface Props {
    pokemon: Pokemon,
    index: number
}

export const PokemonCard: FunctionComponent<Props> = ({pokemon, index}) =>{

    const router = useRouter()

    const click = ()=>{
      router.push(`/pokemon/${pokemon.id}`)
    }

    return(
        <Grid xs={5} sm={3} md={2} xl={1}>
            <Card isPressable isHoverable onClick={click}>
              <Card.Body css={{p: 1}}>
                <Card.Image src={pokemon.img} width="100%" height={300} alt={pokemon.name} />
              </Card.Body>
              <Card.Footer>
                <Row justify="space-between">
                  <Text transform="capitalize">{pokemon.name}</Text>
                  <Text>#{pokemon.id}</Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
    
    )

}

