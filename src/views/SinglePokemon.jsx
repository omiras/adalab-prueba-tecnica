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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <PokemonCard
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types}
          evolvesFrom={pokemon.evolvesFrom}
        />
        <Link to={"/"}>
          <Button>
            <div
              style={{
                fontSize: "2rem",
              }}
            >
              Volver al listado
            </div>
          </Button>
        </Link>
      </div>
    </>
  );
}
