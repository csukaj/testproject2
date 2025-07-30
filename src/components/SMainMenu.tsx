import {Tab, Tabs} from "@mui/material";
import * as React from "react";
import pagePatterns from "../PagePatterns";

export default function SMainMenu() {
  const mainMenuItems = () =>
  {
    switch (pageType()) {
      case 'home':
      case 'layoutExample':
        return []
      case 'blogPostDetails':
        return [
          {title: 'Custom', url: '/'},
          {title: 'Menu', url: '/test', pattern: pagePattern('blogPostDetails')},
          {title: 'for Blog Post page', url: '/blog'}
        ]
      default:
        return [
          {title: 'Home', url: '/'},
          {title: 'Test', url: '/test'},
          {title: 'Blog', url: '/blog'},
          {title: 'Components', url: '/components'},
          {title: 'Layout', url: '/layout'},
          {title: 'Layout Example', url: '/layoutExample'}
        ]
    }
  }

  const pageType = () => {
    const page = pagePatterns.find((page) => (new RegExp(page.pattern)).test(document.location.pathname))
    return page ? page.name : ''
  }

  const pagePattern = (name: string) => {
    const page = pagePatterns.find((page) => page.name === name)
    return page ? page.pattern : undefined
  }

  const mainMenuItemIndex = () => {
    const res = mainMenuItems().findIndex((menuItem) => document.location.pathname === menuItem.url)
    if (res >= 0) return res
    return mainMenuItems().findIndex((menuItem) => menuItem.pattern === undefined ? false : (new RegExp(menuItem.pattern)).test(document.location.pathname))
  }

  const mainMenuItemUrl = () => {
    const items = mainMenuItems();
    const index = mainMenuItemIndex();
    const item = items[index] ?? {url: ''}
    return item.url
  }

  return (
    <Tabs value={mainMenuItemIndex()} centered sx={{width: '100%', display: mainMenuItems().length ? undefined : 'none'}}>
      {mainMenuItems().map((menuItem, index) => (
        <Tab component="a" label={menuItem.title} href={menuItem.url} key={index} sx={{paddingTop: '23px', paddingBottom: '23px'}} />
      ))}
    </Tabs>
  )
}