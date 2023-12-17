import "./App.scss";
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
  const [filterByName, setFilterByName] = useState("");
  const filteredPokemons = pokemons.filter((p) =>
    new RegExp(filterByName, "i").test(p.name)
  );

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

  const handleChangeFilterName = (event) => {
    setFilterByName(event.target.value);
  };

  return (
    <>
      <div className="main-container">
        <div className="pokemon__component">
          <input
            type="text"
            name="filter-name"
            className="filter-name"
            value={filterByName}
            onChange={handleChangeFilterName}
            placeholder="Filtra pokemons por nombre..."
          />
          <div className="pokemons__list">
            {filteredPokemons.map((p) => (
              <PokemonCard
                key={p.id}
                id={p.id}
                name={p.name}
                image={p.image}
                types={p.types}
                evolvesFrom={p.evolvesFrom}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="triangle-left"></div>
      <div className="triangle-right"></div>
      <div className="circle-left"></div>
      <div className="circle-right"></div>
    </>
  );
}

export default App;
