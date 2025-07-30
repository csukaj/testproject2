import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function SButtonContained() {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <div><Button variant="contained" size="small">Small Contained Button</Button></div>
      <div><Button variant="contained" size="medium">Medium Contained Button</Button></div>
      <div><Button variant="contained" size="large">Large Contained Button</Button></div>
    </Stack>
  );
}
