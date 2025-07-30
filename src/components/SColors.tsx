import * as React from 'react';
import Paper from "@mui/material/Paper";
import {useTheme} from "@mui/material/styles";
import Stack from "@mui/material/Stack";

export default function SColors() {
  const theme = useTheme();

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <Paper sx={{padding: 2, color: theme.palette.text.primary}}>text.primary <b>bold.version</b></Paper>
        <Paper sx={{padding: 2, color: theme.palette.text.secondary}}>text.secondary <b>bold.version</b></Paper>
        <Paper sx={{padding: 2, color: theme.palette.text.disabled}}>text.disabled <b>bold.version</b></Paper>
      </Stack>
      <Stack direction="row" gap={2}>
        <Paper sx={{padding: 2, background: theme.palette.primary.light, color: theme.palette.primary.contrastText}}>primary.light</Paper>
        <Paper sx={{padding: 2, background: theme.palette.primary.main, color: theme.palette.primary.contrastText}}>primary.main</Paper>
        <Paper sx={{padding: 2, background: theme.palette.primary.dark, color: theme.palette.primary.contrastText}}>primary.dark</Paper>
      </Stack>
      <Stack direction="row" gap={2}>
        <Paper sx={{padding: 2, background: theme.palette.secondary.light, color: theme.palette.secondary.contrastText}}>secondary.light</Paper>
        <Paper sx={{padding: 2, background: theme.palette.secondary.main, color: theme.palette.secondary.contrastText}}>secondary.main</Paper>
        <Paper sx={{padding: 2, background: theme.palette.secondary.dark, color: theme.palette.secondary.contrastText}}>secondary.dark</Paper>
      </Stack>
      <Stack direction="row" gap={2}>
        <Paper sx={{padding: 2, background: theme.palette.info.light, color: theme.palette.info.contrastText}}>info.light</Paper>
        <Paper sx={{padding: 2, background: theme.palette.info.main, color: theme.palette.info.contrastText}}>info.main</Paper>
        <Paper sx={{padding: 2, background: theme.palette.info.dark, color: theme.palette.info.contrastText}}>info.dark</Paper>
      </Stack>
      <Stack direction="row" gap={2}>
        <Paper sx={{padding: 2, background: theme.palette.warning.light, color: theme.palette.warning.contrastText}}>warning.light</Paper>
        <Paper sx={{padding: 2, background: theme.palette.warning.main, color: theme.palette.warning.contrastText}}>warning.main</Paper>
        <Paper sx={{padding: 2, background: theme.palette.warning.dark, color: theme.palette.warning.contrastText}}>warning.dark</Paper>
      </Stack>
      <Stack direction="row" gap={2}>
        <Paper sx={{padding: 2, background: theme.palette.error.light, color: theme.palette.error.contrastText}}>error.light</Paper>
        <Paper sx={{padding: 2, background: theme.palette.error.main, color: theme.palette.error.contrastText}}>error.main</Paper>
        <Paper sx={{padding: 2, background: theme.palette.error.dark, color: theme.palette.error.contrastText}}>error.dark</Paper>
      </Stack>
      <Stack direction="row" gap={2}>
        <Paper sx={{padding: 2, background: theme.palette.success.light, color: theme.palette.success.contrastText}}>success.light</Paper>
        <Paper sx={{padding: 2, background: theme.palette.success.main, color: theme.palette.success.contrastText}}>success.main</Paper>
        <Paper sx={{padding: 2, background: theme.palette.success.dark, color: theme.palette.success.contrastText}}>success.dark</Paper>
      </Stack>
    </Stack>
  )
}