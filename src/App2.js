import "./App.css";
import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const Container = styled.div({
  margin: "auto",
  width: 800,
  paddingTop: "1rem",
});

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: x-large;
  padding: 0.2rem;
`;

const RadioContainer = styled.td({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const TwoColumnLayout = styled.div({
  display: "grid",
  gridTemplateColumns: "50% 50%",
  gridColumnGap: "1rem",
});

function PokemonRow({ poke, onSelect, isSelected }) {
  return (
    <tr>
      <td>{poke.name.english}</td>
      <td>{poke.type.join(", ")}</td>
      <RadioContainer>
        <IconButton
          onClick={(e) => {
            onSelect(poke);
          }}
        >
          {isSelected ? (
            <RadioButtonCheckedIcon />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
        </IconButton>
      </RadioContainer>
    </tr>
  );
}
PokemonRow.propTypes = {
  poke: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
  }),
  onSelect: PropTypes.func,
};

const PokemonInfo = ({ name, base }) => {
  return (
    <div>
      <h1>{name.english}</h1>
      <table>
        <tbody>
          {Object.keys(base).map((key) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{base[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string,
    base: PropTypes.shape({
      HP: PropTypes.number.isRequired,
      Attack: PropTypes.number.isRequired,
      Defense: PropTypes.number.isRequired,
      "Sp. Attack": PropTypes.number.isRequired,
      "Sp. Defense": PropTypes.number.isRequired,
      Speed: PropTypes.number.isRequired,
    }),
  }),
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      selectedPoke: null,
      pokemonSet: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/potential-lamp/pokemon.json")
      .then((res) => res.json())
      .then((data) =>
        this.setState((state) => {
          return { ...state, pokemonSet: data };
        })
      );
  }

  render() {
    const { filter, selectedPoke, pokemonSet } = this.state;
    return (
      <Container>
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div style={{ background: "greenyellow" }}>
            <Input
              value={filter}
              onChange={(e) => {
                this.setState({ ...this.state, filter: e.target.value });
              }}
            />
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
                          this.setState({ ...this.state, selectedPoke: poke });
                        }}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
          {!!selectedPoke && <PokemonInfo {...selectedPoke} />}
        </TwoColumnLayout>
      </Container>
    );
  }
}

export default App;
