import { useEffect, useState } from 'react'

function App() {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      const data = await response.json();
      setPokemons(data.results)
    }

    fetchPokemons();

  }, [])

  return (
    <>
      {pokemons.map(p => <div key={p.name}>{p.name}</div>)}
    </>
  )
}

export default App
