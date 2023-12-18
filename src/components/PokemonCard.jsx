import "./PokemonCard.scss";

const PokemonCard = ({ id, name, image, types, evolvesFrom, isBigCard }) => {
  const cardClass = `pokemon ${isBigCard ? "pokemon--big" : ""} ${
    !isBigCard ? "pokemon--hover" : ""
  }`;

  return (
    <div className={cardClass}>
      <div className="pokemon__header">
        <div className="pokemon__image">
          <img src={image} alt={"pokemon" + name} />
        </div>
        <div className="pokemon__id">
          ID / <span>{id}</span>
        </div>
      </div>
      <div className="pokemon__info">
        <div className="pokemon__name">{name}</div>
        <div className="pokemon__types">
          {types.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {evolvesFrom && (
          <div className="pokemon__evolution">
            <div>Evoluciona de:</div>
            <div className="pokemon__previous--evolution">{evolvesFrom}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
