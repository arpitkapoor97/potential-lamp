import React from "react";
import PokemonRow from "./PokemonRow";
// import PokemonContext from "../PokemonContext";
import { useSelector, useDispatch } from "react-redux";

const PokemonTable = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const pokemonSet = useSelector((state) => state.pokemonSet);
  const selectedPoke = useSelector((state) => state.selectedPoke);

  // const {
  //   state: { filter, pokemonSet, selectedPoke},
  //   dispatch,
  // } = React.useContext(PokemonContext);

  return (
    <table className="default_grid" width="100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {pokemonSet
          .filter((poke, i) => {
            return poke.name.english
              .toLowerCase()
              .includes(filter.toLowerCase());
          })
          .slice(0, 20)
          .map((poke) => {
            return (
              <PokemonRow
                poke={poke}
                key={poke.id}
                isSelected={
                  selectedPoke !== null &&
                  poke.name.english === selectedPoke.name.english
                }
                onSelect={(poke) => {
                  dispatch({
                    type: "SET_POKE",
                    payload: poke,
                  });
                }}
              />
            );
          })}
      </tbody>
    </table>
  );
};

export default PokemonTable;
