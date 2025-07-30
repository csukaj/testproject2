import * as React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from "../Routes";
import Box from "@mui/material/Box";
import SMainMenu from "./SMainMenu";
import {useTheme} from "@mui/material/styles";

export default function SAppMain()
{
    const theme = useTheme()

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                paddingTop: theme.typography.pxToRem(theme.mixins.toolbar.minHeight as number)
            }}
        >
            <SMainMenu/>
            <RouterProvider
                router={createBrowserRouter(routes)}
            />
        </Box>
    )
}