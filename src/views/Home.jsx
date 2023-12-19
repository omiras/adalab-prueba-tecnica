import "./Home.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPokemons } from "../services/ApiServices";
import PokemonCard from "../components/PokemonCard";
import Spinner from "../components/ux/Spinner";
import Button from "../components/ux/Button";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState("");
  const filteredPokemons = pokemons.filter((p) =>
    new RegExp(filterByName, "i").test(p.name)
  );
  const visibleItems = {
    filter: !loading,
    loadingSpinner: loading,
    noPokemonsFound: !loading && filteredPokemons.length == 0,
    pokemonList: filteredPokemons.length != 0,
    nextButton: !loading && !filterByName,
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const mappedPokemons = await getPokemons(page);
      setLoading(false);
      return mappedPokemons;
    };

    fetchPokemons().then((nextPokemons) =>
      setPokemons([...pokemons, ...nextPokemons])
    );
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleChangeFilterName = (event) => {
    setFilterByName(event.target.value);
  };

  return (
    <>
      <div className="main-container">
        <div className="pokemon__component">
          {visibleItems.filter && (
            <input
              readOnly={loading}
              type="text"
              name="filter-name"
              className="filter-name"
              value={filterByName}
              onChange={handleChangeFilterName}
              placeholder="Filtra pokemons por nombre..."
            />
          )}
          {visibleItems.noPokemonsFound && (
            <h1>
              No se encuentran pokemons con la palabra <em>{filterByName}</em>
            </h1>
          )}
          {visibleItems.pokemonList && (
            <div className="pokemons__list">
              {filteredPokemons.map((p) => (
                <Link key={p.id} to={`/pokemon/${p.name}`}>
                  <PokemonCard
                    id={p.id}
                    name={p.name}
                    image={p.image}
                    types={p.types}
                    evolvesFrom={p.evolvesFrom}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
        {visibleItems.loadingSpinner && <Spinner />}

        {visibleItems.nextButton && (
          <div onClick={handleNextPage}>
            <Button>Cargar más pokemons</Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
