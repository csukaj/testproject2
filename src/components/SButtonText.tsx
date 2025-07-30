import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function SButtonText() {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <div><Button variant="text" size="small">Small Text Button</Button></div>
      <div><Button variant="text" size="medium">Medium Text Button</Button></div>
      <div><Button variant="text" size="large">Large Text Button</Button></div>
    </Stack>
  );
}
