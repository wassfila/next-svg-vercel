import { useCallback, useState, useEffect} from 'react';
import PanZoomSlide from '../components/PanZoomSlide'
import {Box, Paper, ImageList,ImageListItem,ImageListItemBar,
  IconButton,Stack,Typography,Button,ListSubheader  } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LinkIcon from '@mui/icons-material/Link';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PanZoomModal from '../components/PanZoomModal'

export default function PanZoomThmb({item,thumb_width}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box mb={1} >
        <Paper >
          <Stack
            direction="column"
            alignItems="center"
          >
            <Box p={1}>
              <img width={thumb_width}
              src={item.thumb}
              alt={item.href}
              onClick={()=>{setOpen(true)}}
              style={{cursor:"zoom-in"}}
              />
            </Box>
          </Stack>
          <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          >
            <Typography component="div" ml={2} sx={{ flexGrow: 1, maxWidth:120 }}>
            {item.name}
            </Typography>
            <IconButton
            sx={{ color: 'black' }}
            aria-label={`star ${item.title}`}
            href={`#${item.href}`}
            >
            <LinkIcon/>
            </IconButton>
          </Stack>  
        </Paper>
      </Box>
      <PanZoomModal src={item.src} open={open} handleClose={()=>{setOpen(false)}}/>
    </>
  )
}
