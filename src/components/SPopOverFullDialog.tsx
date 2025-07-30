import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import SPopper from "./SPopper";
import {useTheme} from "@mui/material/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SFilterButton from "./SFilterButton";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SPopOverFullDialog(props: any)
{
  if (props.hidden) {
    return null
  }

  const theme = useTheme();

  const [width, setWidth] = React.useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [popOverAnchorEl, setPopOverAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const popOverOpen = Boolean(popOverAnchorEl);
  const id = popOverOpen ? 'simple-popover' : undefined;

  const open = (event: React.MouseEvent<HTMLButtonElement>) => {
    (width < theme.breakpoints.values.md) ? setDialogOpen(true) : setPopOverAnchorEl(event.currentTarget)
  }
  const close = () => {
    setPopOverAnchorEl(null)
    setDialogOpen(false)
  }

  return (
    <div>
      <ClickAwayListener onClickAway={close}>
        <div>
          <SFilterButton
            text={props.buttonText}
            aria-describedby={id}
            onClick={open}
            startIcon={props.buttonIcon}
          />

          <SPopper id={id} open={popOverOpen} close={close} anchorEl={popOverAnchorEl} content={props.content} title={props.title} placement={props.placement ?? "bottom-start"} />
        </div>
      </ClickAwayListener>

      <Dialog fullScreen open={dialogOpen} onClose={close} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={close} aria-label="close" >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        {props.content}
      </Dialog>
    </div>
  );
}
