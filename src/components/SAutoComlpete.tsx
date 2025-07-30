import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HotelIcon from '@mui/icons-material/Hotel';
import { createFilterOptions } from '@mui/material/Autocomplete';

// @ts-ignore
import parse from 'autosuggest-highlight/parse';
// @ts-ignore
import match from 'autosuggest-highlight/match';
import {Popper} from "@mui/material";
import Paper from "@mui/material/Paper";

export default function SAutoComplete(props: any) {
  return (
    <Box sx={{
      position: "relative",
      width: props.width ?? '100%',
    }}>
      <Autocomplete
        disablePortal={true}
        autoHighlight={true}
        id="combo-box-demo"
        options={demoOptions}
        sx={{
          width: '100%',
        }}
        PopperComponent={(params) =>
          <Popper style={{width: "100%"}} sx={{zIndex: 1}} placement="bottom-start" {...params}  />
        }
        PaperComponent={(params) =>
          <Paper sx={{marginTop: props.marginTop ?? 0}}{...params} />
        }
        renderInput={(params) =>
          <TextField {...params} placeholder={props.label} sx={{paddingTop: 0}}  />
        }
        filterOptions={createFilterOptions({
          stringify: (option: any) => option.label + '|' + option.year + '|' + option.subtext,
        })}
        renderOption={(props, option, {inputValue}) => {
          const labelParts = parse(option.label, match(option.label, inputValue, {insideWords: true}));
          const yearParts = parse(option.year, match(option.year, inputValue, {insideWords: true}));
          const subtextParts = parse(option.subtext, match(option.subtext, inputValue, {insideWords: true}));

          return <Box component="li" sx={{ width: '100%' }} {...props}>
              <Box sx={{display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 2}}>
                <HotelIcon />
                <Box>
                  <Box>
                    {labelParts.map((part: any, index: number) => (<span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>{part.text}</span>))}
                  </Box>
                  <Box sx={{display: 'flex', gap: 2}}>
                    <Typography color={"gray"} fontSize="small">
                      {yearParts.map((part: any, index: number) => (<span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>{part.text}</span>))}
                    </Typography>
                    <Typography fontSize="small">
                      {subtextParts.map((part: any, index: number) => (<span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>{part.text}</span>))}
                    </Typography>
                  </Box>
                </Box>
              </Box>
          </Box>
        }}
      />
    </Box>
  );
}

const demoOptions = [
  { label: 'The Shawshank Redemption', year: 1994, subtext: 'sample'},
  { label: 'The Godfather', year: 1972, subtext: 'example' },
  { label: 'The Godfather: Part II', year: 1974, subtext: 'sample text' },
  { label: 'The Dark Knight', year: 2008, subtext: 'example sample text' },
  { label: '12 Angry Men', year: 1957, subtext: 'example sample text' },
  { label: "Schindler's List", year: 1993, subtext: 'example sample text' },
  { label: 'Pulp Fiction', year: 1994, subtext: 'example sample text' },
  { label: 'The Lord of the Rings: The Return of the King', year: 2003, subtext: 'example sample text'},
  { label: 'The Good, the Bad and the Ugly', year: 1966, subtext: 'example sample text' },
  { label: 'Fight Club', year: 1999, subtext: 'example sample text' },
  { label: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, subtext: 'example sample text' },
  { label: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980, subtext: 'example sample text' },
  { label: 'Forrest Gump', year: 1994, subtext: 'example sample text' },
  { label: 'Inception', year: 2010, subtext: 'example sample text' },
  { label: 'The Lord of the Rings: The Two Towers', year: 2002, subtext: 'example sample text' },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975, subtext: 'example sample text' },
  { label: 'Goodfellas', year: 1990, subtext: 'example sample text' },
  { label: 'The Matrix', year: 1999, subtext: 'example sample text' },
  { label: 'Seven Samurai', year: 1954, subtext: 'example sample text' },
];
