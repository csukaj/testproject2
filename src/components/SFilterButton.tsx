import * as React from 'react';
import Button from '@mui/material/Button';
import {useTheme} from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function SFilterButton(props: any)
{
  const theme = useTheme();

  if (props.hidden) {
    return null
  }

  return (
    <Button
      {...props}
      variant="contained"
      color={"inherit"}
      size="small"
      endIcon={props.dropDownArrowIcon ?? true ? <ArrowDropDownIcon /> : null}
      disableRipple={true}
      disableFocusRipple={true}
      disableTouchRipple={true}
      disableElevation={true}
    >
      {props.text}
    </Button>
  )
}