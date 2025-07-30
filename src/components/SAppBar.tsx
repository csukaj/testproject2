import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SDrawerMenu from "./SDrawerMenu";
import SLogo from "./SLogo";
import SUserMenu from "./SUserMenu";

export default function SAppBar() {
    return (
        <AppBar
            position="fixed"
            sx={{
                background: '#f6f7f3'
            }}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <SDrawerMenu/>
                <SLogo/>
                <SUserMenu/>
            </Toolbar>
        </AppBar>
    )
}