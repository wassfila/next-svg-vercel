import PanZoomSVG from '../components/PanZoomSVG'
import {Paper, Box, Grid, Stack, Divider,
        IconButton,Button,ListSubheader, Typography  } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function PanZoomGrid({list,thumbnails=false}) {
  let thumb_list = []
  if(thumbnails){
    thumb_list = list.map((item)=>({
      thumb:item.replace('.svg','.thumb.png'),
      href:`pz-${item}`,
      name:item.replace('.svg','')
    }))
  }
  return (
    <>
      {thumbnails &&
        <Box mt={1}>
        <Grid container spacing={{ xs: 2, md: 3 }} >
          {thumb_list.map((item,index) => (
            <Grid item key={index} xs={2} sx={{minWidth:300}}>
              <Box >
                <Paper >
                  <Stack
                    direction="column"
                    spacing={2}
                    alignItems="center"
                  >
                    <img width="200"
                      src={`${item.thumb}?fit=crop&auto=format`}
                      srcSet={`${item.thumb}?fit=crop&auto=format&dpr=2 2x`}
                      alt={item.href}
                      loading="lazy"
                      onClick={()=>{document.getElementById(`pz-fs-${item.name}.svg`).click()}}
                      style={{cursor:"zoom-in"}}
                    />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="h6" component="div" ml={2} sx={{ flexGrow: 1 }}>
                                        {item.name}
                      </Typography>
                      <IconButton
                        sx={{ color: 'black' }}
                        aria-label={`star ${item.title}`}
                        href={`#${item.href}`}
                      >
                        <KeyboardArrowDownIcon />
                      </IconButton>
                  </Stack>
                </Paper>
              </Box>
            </Grid>
            ))}
        </Grid>
      </Box>
    }
      {list.map((file,index)=>
        <PanZoomSVG key={index} src={file}/>
      )}
    </>
  )
}
