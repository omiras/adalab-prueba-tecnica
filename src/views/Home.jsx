import "./Home.scss";
import { useEffect, useState } from "react";
import { getPokemons } from "../services/ApiServices";
import PokemonCard from "../components/PokemonCard";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [filterByName, setFilterByName] = useState("");
  const filteredPokemons = pokemons.filter((p) =>
    new RegExp(filterByName, "i").test(p.name)
  );

  useEffect(() => {
    const fetchPokemons = async () => {
      const mappedPokemons = await getPokemons();
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
    </>
  );
}

export default Home;
