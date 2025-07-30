import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useTheme} from "@mui/material/styles";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function SSelect() {
  const theme = useTheme();

  const [age, setAge] = React.useState('');

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={(event: SelectChangeEvent) => setAge(event.target.value as string)}
          displayEmpty
          sx={{
            color: age ? null : theme.palette.text.disabled
          }}
          startAdornment={
            <InputAdornment position="start" hidden={age === ''}>
              <IconButton edge="start" size="small" onClick={() => setAge('')}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          }
        >
          <MenuItem value="" sx={{display: 'none'}}>Age</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
