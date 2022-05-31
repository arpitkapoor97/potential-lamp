import IconButton from "@mui/material/IconButton";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import PokemonType from "../PokemonType";
import styled from "@emotion/styled";

const RadioContainer = styled.td({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
  poke: PokemonType
};

export default PokemonRow;
