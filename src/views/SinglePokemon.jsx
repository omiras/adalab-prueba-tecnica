import PokemonCard from "../components/PokemonCard";
import Button from "../components/ux/Button";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPokemonByName } from "../services/ApiServices";

export default function SinglePokemon() {
  const [pokemon, setPokemon] = useState();

  // Como lo hacemos para recuperar la parte dinámica de esta ruta? Y poder hacer la consulta a la API o Base de Datos para recuperar la información de un pokemon en especifico
  const params = useParams();
  console.log("variable params: ", params);

  useEffect(() => {
    getPokemonByName(params.name)
      .then((data) => setPokemon(data))
      .catch((error) => {
        console.log("Oh No! There was a problem: \n", error);
      });
  }, [params.name]);

  if (!pokemon) {
    return;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PokemonCard
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types}
          evolvesFrom={pokemon.evolvesFrom}
        />
      </div>
      <Link to={"/"}>
        <Button>
          <div>Volver al listado</div>
        </Button>
      </Link>
    </>
  );
}
