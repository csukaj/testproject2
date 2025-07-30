import * as React from 'react';
import TextField from "@mui/material/TextField";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Add, Remove} from "@mui/icons-material";

export default function SNumberField2() {
  const [value, setValue] = React.useState(0);

  return (
    <TextField
      onChange={(input) => setValue(parseInt(input.target.value))}
      value={value}
      type="number"
      label="Numeric Field"
      id="outlined-start-adornment"
      sx={{ m: 1, width: '150px', textAlign: "center" }}
      InputProps={{
        inputProps: {
          style: {textAlign: 'center'},
        },
        startAdornment: <InputAdornment position="start">
          <IconButton edge="start" onClick={() => setValue(value - 1)}>
            <Remove />
          </IconButton>
        </InputAdornment>,
        endAdornment: <InputAdornment position="end">
          <IconButton edge="end" onClick={() => setValue(value + 1)}>
            <Add />
          </IconButton>
        </InputAdornment>
      }}
    />
  );
}
