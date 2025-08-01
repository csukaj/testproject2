import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
      borderRadius:  theme.typography.pxToRem(8)
  },
}));

export default function STooltip(props: any) {
  return (
    <div>
      <HtmlTooltip
        title={props.title}
        placement={props.placement ?? "bottom"}
      >
          {props.content}
      </HtmlTooltip>
    </div>
  );
}
