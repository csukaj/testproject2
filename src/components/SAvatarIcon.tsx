import * as React from 'react';
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import FolderIcon from '@mui/icons-material/Folder';
import PageviewIcon from '@mui/icons-material/Pageview';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function SAvatarIcon() {
  return (
    <Avatar sx={{ bgcolor: pink[500] }}>
      <PageviewIcon />
    </Avatar>
  );
}
