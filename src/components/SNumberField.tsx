import * as React from 'react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {Add, Remove} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import {useTheme} from "@mui/material/styles";

export default function SNumberField() {
  const theme = useTheme()

  const [value, setValue] = React.useState(0);

  return (
    <Stack direction="row" alignItems="center">
      <div>
        <IconButton onClick={() => setValue(value - 1)}>
          <Remove />
        </IconButton>
      </div>
      <TextField
        onChange={(input) => setValue(parseInt(input.target.value))}
        value={value === 0 ? '' : value}
        type="number"
        placeholder="Number"
        sx={{
          mx: 1,
          textAlign: "center",
          width: theme.typography.pxToRem(100),
        }}
        InputProps={{
          inputProps: {
            style: {textAlign: 'center'},
          }
        }}
      />
      <div>
        <IconButton onClick={() => setValue(value + 1)}>
          <Add />
        </IconButton>
      </div>
    </Stack>
  );
}
