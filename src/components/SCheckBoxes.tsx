import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function SCheckBoxes(props: any) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{props.label}</FormLabel>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox List Example" />
        <FormControlLabel required control={<Checkbox />} label="Required Option" />
        <FormControlLabel disabled control={<Checkbox />} label="This is Disabled" />
      </FormGroup>
    </FormControl>
  );
}
