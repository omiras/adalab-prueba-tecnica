import "./PokemonCard.scss";

const PokemonCard = ({ id, name, image, types, evolvesFrom }) => {
  return (
    <div className="pokemon">
      <div className="pokemon__header">
        <div className="pokemon__image">
          <img src={image} alt={"pokemon" + name} />
        </div>
        <div className="pokemon__id">
          ID / <span>{id}</span>
        </div>
      </div>
      <div>
        <div>{name}</div>
        <div>{types}</div>
        <div>
          <div>Evoluciona de:</div>
          <div>{evolvesFrom}</div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
