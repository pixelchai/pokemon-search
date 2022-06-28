import React from "react";
import "./App.scss";
import pokemon from "./pokemon.json";

const DEFAULT_LANG = "english";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select!</button>
    </td>
  </tr>
);

const PokemonInfo = ({ name, base }) => {
  let otherNames = Object.keys(name).filter((k) => k !== DEFAULT_LANG);
  return (
    <div className="pokemon-info">
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
      <h1 className="title">Pokemon Search</h1>
      <input
        value={searchValue}
        onChange={(e) => searchValueSet(e.target.value)}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gridColumnGap: "1rem",
        }}
      >
        <table width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {pokemon
              .filter((pokemon) =>
                pokemon.name.english
                  .toLowerCase()
                  .includes(searchValue.toLocaleLowerCase())
              )
              .slice(0, 20)
              .map((pokemon) => (
                <PokemonRow
                  pokemon={pokemon}
                  key={pokemon.id}
                  onSelect={(pokemon) => selectedItemSet(pokemon)}
                />
              ))}
          </tbody>
        </table>
      </div>
      {selectedItem && <PokemonInfo {...selectedItem} />}
    </div>
  );
}

export default App;
