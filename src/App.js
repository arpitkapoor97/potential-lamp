import "./App.css";
import React from "react";
import styled from "@emotion/styled";
import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
// import PokemonContext from "./PokemonContext";

import { createStore } from "redux";
import { Provider, useDispatch } from "react-redux";

const stateReducer = (
  state = {
    filter: "",
    pokemonSet: [],
    selectedPoke: null,
  },
  { type, payload }
) => {
  switch (type) {
    case "SET_FILTER":
      return {
        ...state,
        filter: payload,
      };
    case "SET_POKE":
      return {
        ...state,
        selectedPoke: payload,
      };
    case "SET_POKEMON_SET":
      return {
        ...state,
        pokemonSet: payload,
      };
    default:
      // throw new Error("No action");
      return state;
  }
};

const Container = styled.div({
  margin: "auto",
  width: 800,
  paddingTop: "1rem",
});

const Title = styled.h1`
  text-align: center;
`;

const TwoColumnLayout = styled.div({
  display: "grid",
  gridTemplateColumns: "50% 50%",
  gridColumnGap: "1rem",
});

const store = createStore(stateReducer);

function App() {
  const dispatch = useDispatch();
  // const pokemonSet = useSelector((state) => state.pokemonSet);

  React.useEffect(() => {
    fetch("http://localhost:3000/potential-lamp/pokemon.json")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "SET_POKEMON_SET",
          payload: data,
        })
      );
  }, []);

  return (
    // <PokemonContext.Provider
    //   value={{
    //     state,
    //     dispatch,
    //   }}
    // >
    <Container>
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          <PokemonFilter />
          <PokemonTable />
        </div>
        <PokemonInfo />
      </TwoColumnLayout>
    </Container>
    // </PokemonContext.Provider>
  );
}

// export default App;
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
