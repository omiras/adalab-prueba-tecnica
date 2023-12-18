const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || "https://pokeapi.co/api/v2";

const fetchSinglePokemon = async (pokemonName) => {
  const responseSinglePokemon = await fetch(
    `${BASE_API_URL}/pokemon/${pokemonName}`
  );
  const dataSinglePokemon = await responseSinglePokemon.json();
  return dataSinglePokemon;
};

const fetchPokemonSpecies = async (urlSpacies) => {
  const response = await fetch(urlSpacies);
  const data = await response.json();
  return data;
};

export async function getPokemonByName(name) {
  const dataSinglePokemon = await fetchSinglePokemon(name);
  console.log(
    "🚀 ~ file: App.jsx:31 ~ fetchPokemons ~ dataSinglePokemon:",
    dataSinglePokemon
  );

  const dataSpecies = await fetchPokemonSpecies(
    dataSinglePokemon.species.url
  );

  return {
    id: dataSinglePokemon.id,
    name: dataSinglePokemon.name,
    image: dataSinglePokemon.sprites.front_default,
    types: dataSinglePokemon.types.map((t) => t.type.name),
    evolvesFrom:
      dataSpecies.evolves_from_species &&
      dataSpecies.evolves_from_species.name,
  };
}

export async function getPokemons(page) {

  const limit = 20;
  const offset = (page - 1) * limit;

  const response = await fetch(`${BASE_API_URL}/pokemon/?limit=${limit}&offset=${offset}`);
  const data = await response.json();

  const mappedPokemons = [];

  for (const p of data.results) {
    const nextPokemon = await getPokemonByName(p.name);
    mappedPokemons.push(nextPokemon);
  }

  return mappedPokemons;

}
