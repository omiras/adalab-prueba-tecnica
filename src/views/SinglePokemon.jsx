import PokemonCard from "../components/PokemonCard";
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
          width: "340px",
          margin: "0 auto",
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
        <div
          style={{
            backgroundColor: "#f1f1f1",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid black",
            margin: "1rem auto",
            width: "200px",
            cursor: "pointer",
          }}
        >
          Volver al listado
        </div>
      </Link>
    </>
  );
}
