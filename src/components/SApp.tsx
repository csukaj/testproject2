import * as React from "react";
import {LicenseInfo} from "@mui/x-license-pro";
import licenceKey from "../LicenceKey";
import Box from "@mui/material/Box";
import SAppBar from "./SAppBar";
import SAppMain from "./SAppMain";

LicenseInfo.setLicenseKey(licenceKey);

export default function SApp()
{
    return (
        <Box
            sx={{
                display: 'block'
            }}
        >
            <SAppBar/>
            <SAppMain/>
        </Box>
    )
}