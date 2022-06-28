import React from "react";
import "./App.scss";
import pokemon from "./pokemon.json";

const DEFAULT_LANG = "english";

const PokemonRow = ({ pokemon, onSelect, isSelected }) => (
  <div
    className={`result-row result-row-entry ${
      (isSelected && "selected") || ""
    }`}
    onMouseDown={() => onSelect(pokemon)}
  >
    <div>{pokemon.name[DEFAULT_LANG]}</div>
    <div>{pokemon.type.join(", ")}</div>
  </div>
);

const PokemonInfo = ({ name, base, id }) => {
  let otherNames = Object.keys(name).filter((k) => k !== DEFAULT_LANG);
  return (
    <div className="pokemon-info box">
      <div
        className="sprite"
        style={{
          backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png)`,
        }}
      ></div>
      <div className="name-holder">
        <div className="name">{name[DEFAULT_LANG]}</div>
        <div className="other-names">
          {otherNames.map((key, index) => (
            <span className="other-name">
              {name[key]} ({key})
              {index < otherNames.length - 1 && (
                <span className="separator">・</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [searchValue, searchValueSet] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);

  return (
    <div
      style={{
        margin: "auto",
        maxWidth: 800,
        paddingTop: "1rem",
      }}
    >
      <div className="top-box box">
        <h1 className="title">Pokemon Search</h1>
        <input
          value={searchValue}
          onChange={(e) => searchValueSet(e.target.value)}
        />
      </div>

      <div className="search-results box">
        <div className="result-row result-row-header">
          <div>Name</div>
          <div>Type</div>
        </div>
        {pokemon
          .filter((pokemon) =>
            pokemon.name[DEFAULT_LANG].toLowerCase().includes(
              searchValue.toLocaleLowerCase()
            )
          )
          .slice(0, 20)
          .map((pokemon) => (
            <PokemonRow
              pokemon={pokemon}
              key={pokemon.id}
              onSelect={(pokemon) => selectedItemSet(pokemon)}
              isSelected={selectedItem && pokemon.id === selectedItem.id}
            />
          ))}
      </div>
      {selectedItem && <PokemonInfo {...selectedItem} />}
    </div>
  );
}

export default App;
