

export interface PokemonList {
    next?: string,
    previous?: string,
    count: number,
    results: Pokemon[]
}

export interface Pokemon {
    name: string,
    url: string,
    id: number, 
    img: string
}
