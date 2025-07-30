import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

export default function STypography() {
  return (
    <Stack direction="column" gap={2} alignItems="center">
      <div><Typography variant="h1">Heading1 Text Example</Typography></div>
      <div><Typography variant="h2">Heading2 Text Example</Typography></div>
      <div><Typography variant="h3">Heading3 Text Example</Typography></div>
      <div><Typography variant="h4">Heading4 Text Example</Typography></div>
      <div><Typography variant="h5">Heading5 Text Example</Typography></div>
      <div><Typography variant="h6">Heading6 Text Example</Typography></div>
      <div><Typography variant="body1">Body1 Text Example</Typography></div>
      <div><Typography variant="body2">Body2 Text Example</Typography></div>
      <div><Typography variant="subtitle1">Subtitle1 Text Example</Typography></div>
      <div><Typography variant="subtitle2">Subtitle2 Text Example</Typography></div>
      <div><Typography variant="inherit">Inherit Text Example</Typography></div>
      <div><Typography variant="button">Button Text Example</Typography></div>
      <div><Typography variant="overline">Overline Text Example</Typography></div>
    </Stack>
  );
}
