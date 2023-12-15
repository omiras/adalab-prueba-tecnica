import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";

function App() {
  const fetchSinglePokemon = async (pokemonName) => {
    const responseSinglePokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const dataSinglePokemon = await responseSinglePokemon.json();
    return dataSinglePokemon;
  };

  const fetchPokemonSpecies = async (urlSpacies) => {
    const response = await fetch(urlSpacies);
    const data = await response.json();
    return data;
  };

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();

      const mappedPokemons = [];

      for (const p of data.results) {
        const dataSinglePokemon = await fetchSinglePokemon(p.name);
        console.log(
          "🚀 ~ file: App.jsx:31 ~ fetchPokemons ~ dataSinglePokemon:",
          dataSinglePokemon
        );

        const dataSpecies = await fetchPokemonSpecies(
          dataSinglePokemon.species.url
        );

        mappedPokemons.push({
          id: dataSinglePokemon.id,
          name: dataSinglePokemon.name,
          image: dataSinglePokemon.sprites.front_default,
          types: dataSinglePokemon.types.map((t) => t.type.name),
          evolvesFrom:
            dataSpecies.evolves_from_species &&
            dataSpecies.evolves_from_species.name,
        });
      }
      return mappedPokemons;
    };

    fetchPokemons().then((allPokemons) => setPokemons(allPokemons));
  }, []);

  return (
    <>
      <PokemonCard />
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {pokemons.map((p) => (
          <article
            style={{
              border: "1px solid black",
            }}
            key={p.id}
          >
            <ul>
              <li>Id: {p.id}</li>
              <li>Name: {p.name}</li>
              <li>
                <img src={p.image}></img>
              </li>
              <li>Types: {p.types.join(" ")}</li>
              <li>Evolves from: {p.evolvesFrom}</li>
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}

export default App;
