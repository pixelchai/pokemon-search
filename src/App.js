import React from "react";
import "./App.css";
import pokemon from "./pokemon.json";

const PokemonRow = ({ pokemon }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
  </tr>
);

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
                <PokemonRow pokemon={pokemon} key={pokemon.id} />
              ))}
          </tbody>
        </table>
      </div>
      {selectedItem && <h1>selectedItem.name.english</h1>}
    </div>
  );
}

export default App;
