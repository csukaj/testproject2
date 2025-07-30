import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

const transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SFullScreenDialog(props: any) {
  return (
    <Dialog fullScreen open={props.open} TransitionComponent={transition} PaperProps={{onScroll: (event: any) => {
            if (
                event.target.scrollTop === 0
            ) {
                event.target.scrollTop = 2
                console.log('UP')
                // props.setPosition(2)
                // console.log(props.calendar.current)
                // props.calendar.props.slots.previousIconButton().props.onClick()
                // console.log(props.calendar.props.slots.previousIconButton)
            } else
            if (
                Math.round(event.target.scrollHeight - event.target.scrollTop) === event.target.clientHeight
            ) {
                event.target.scrollTop = event.target.scrollTop - 2
                console.log('DOWN')
                // props.setPosition(1)
                // console.log(props.calendar.props.slots.nextIconButton)
                // props.calendar.props.slots.nextIconButton().props.onClick()
                // props.calendar.props.slots.rightArrowIcon().props.onClick()
            } else {
                // console.log([event.target.scrollHeight - event.target.scrollTop, event.target.clientHeight])
            }
        }}}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={props.close} aria-label="close" >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      {props.content}
    </Dialog>
  )
}