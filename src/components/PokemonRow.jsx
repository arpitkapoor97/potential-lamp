import IconButton from "@mui/material/IconButton";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import PropTypes from "prop-types";
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
  poke: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
  }),
  onSelect: PropTypes.func,
};

export default PokemonRow;
