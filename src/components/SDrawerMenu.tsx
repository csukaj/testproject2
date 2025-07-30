import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import pagePatterns from "../PagePatterns";

export default function SDrawerMenu() {
  const [drawerState, setDrawerState] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerState(open);
  };

  const pagePattern = (name: string) => {
    const page = pagePatterns.find((page) => page.name === name)
    return page ? page.pattern : undefined
  }

  const drawerMenuItems = () => [
    {title: 'Home', url: '/'},
    {title: 'Test', url: '/test', pattern: pagePattern('blogPostDetails')},
    {title: 'Components', url: '/components'},
    {title: 'Layout', url: '/layout'},
    {title: 'Layout Example', url: '/layoutExample'}
  ]

  const drawerMenuItemUrl = () => {
    const items = drawerMenuItems();
    const index = drawerMenuItemIndex();
    const item = items[index] ?? {url: ''}
    return item.url
  }

  const drawerMenuItemIndex = () => {
    const res = drawerMenuItems().findIndex((menuItem) => document.location.pathname === menuItem.url)
    if (res >= 0) return res
    return drawerMenuItems().findIndex((menuItem) => menuItem.pattern === undefined ? false : (new RegExp(menuItem.pattern)).test(document.location.pathname))
  }

  return (
    <>
      <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer(true)} edge="start">
        <MenuIcon />
      </IconButton>
      <Drawer anchor={'left'} open={drawerState} onClose={toggleDrawer(false)}>
        <List>
          {drawerMenuItems().map((menuItem, key) => (
            <ListItem key={menuItem.title} disablePadding href={menuItem.url} component='a' sx={{ display: 'block' }}>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon color={drawerMenuItemUrl() === menuItem.url ? "primary" : "inherit"} />
                </ListItemIcon>
                <ListItemText primary={menuItem.title} sx={{paddingRight: '50px'}} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}