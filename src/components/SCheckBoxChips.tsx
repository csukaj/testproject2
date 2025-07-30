import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Chip from "@mui/material/Chip";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import {useState} from "react";
import {useTheme} from "@mui/material/styles";

export default function SCheckBoxChips(
  props: {
      label: string
  }
) {
    const [value, setValue] = useState(false)

    let icon

    if (value) {
        icon = <TagFacesIcon/>
    }

    return (
      <Chip
        color={value ? "primary" : "default"}
        icon={icon}
        label={props.label}
        onClick={() => setValue(!value)}
        sx={{width: "max-content"}}
      />
    );
}
