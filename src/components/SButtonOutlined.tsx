import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function SButtonOutlined() {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <div><Button variant="outlined" size="small">Small Outlined Button</Button></div>
      <div><Button variant="outlined" size="medium">Medium Outlined Button</Button></div>
      <div><Button variant="outlined" size="large">Large Outlined Button</Button></div>
    </Stack>
  );
}
