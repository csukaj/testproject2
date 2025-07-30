import * as React from "react";
import {Popper} from "@mui/material";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function SPopper(props: any) {
  return (
    <Popper id={props.id} open={props.open} anchorEl={props.anchorEl} sx={{zIndex: 1}} placement={props.placement}>
      <Typography variant="subtitle1" sx={{
        position: "absolute",
        left: 12,
        top: 12,
        lineHeight: "41px",
        whiteSpace: "nowrap",
        width: "100%",
        paddingRight: "55px",
        textOverflow: "ellipsis",
        overflow: "hidden"
      }}>
        {props.title}
      </Typography>
      <IconButton edge="start" color="inherit" onClick={props.close} aria-label="close" sx={{position: "absolute", right: 4, top: 12}}>
        <CloseIcon />
      </IconButton>
      <Paper sx={{marginTop: props.marginTop ?? 1, paddingTop: "45px", paddingBottom: "8px"}}>
        <Box sx={{maxHeight: "calc(100vh - 227px)", overflowY: "auto"}}>
          {props.content}
        </Box>
      </Paper>
    </Popper>
  )
}