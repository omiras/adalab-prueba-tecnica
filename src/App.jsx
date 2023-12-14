import { useEffect, useState } from 'react'

function App() {

  const [pokemons, setPokemons] = useState([]);



  useEffect(() => {


    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      const data = await response.json();

      const mappedPokemons = [];

      for (const p of data.results) {

        const responseSinglePokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`);
        const dataSinglePokemon = await responseSinglePokemon.json();


        const responseEvolution = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${dataSinglePokemon.id}`);
        const dataEvolution = await responseEvolution.json();

        mappedPokemons.push({
          id: dataSinglePokemon.id,
          name: dataSinglePokemon.name,
          image: dataSinglePokemon.sprites.front_default,
          types: dataSinglePokemon.types.map(t => t.type.name),
          evolutions: dataEvolution.chain.evolves_to.map(e => e.species.name)
        });
      }
      return mappedPokemons;
    };



    fetchPokemons().then(allPokemons => setPokemons(allPokemons));

  }, [])

  return (
    <>
      <div>{pokemons.map(p => <article style={{
        border: "1px solid black"
      }} key={p.id}>
        <ul>
          <li>Id: {p.id}</li>
          <li>Name: {p.name}</li>
          <li><img src={p.image}></img></li>
          <li>Types: {p.types.join(' ')}</li>
          <li>Evolutions: {p.evolutions.join(' ')}</li>
        </ul>
      </article>)}</div>
    </>
  )
}

export default App
