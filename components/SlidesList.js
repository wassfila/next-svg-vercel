import { useState, useCallback, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import PanZoomSlide from '../components/PanZoomSlide'
import {Box, Grid,Slider,AppBar,Toolbar,IconButton,
        Typography,Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import * as rutl from './react_utils'

const AppSlider = styled(Slider)(({theme})=>({
  height:10,
  '& .MuiSlider-track': {
      border: 'none',
      opacity: 0.8,
      height:10,
      backgroundColor: '#fff',
    },
  '& .MuiSlider-rail': {
      opacity: 0.5,
      backgroundColor: '#fff',
    },
    '& .MuiSlider-thumb': {
      height: 30,
      width: 20,
      backgroundColor: '#bfbfbf',
      border: '0px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
}))


export default function SlidesList({list}) {
  const minWidth = 400
  const [stored_width,setStoredWidth] = rutl.useLocalStorage("slide_width",minWidth)
  const [width,setWidth] = useState(minWidth)
  const [maxWidth,setMaxWidth] = useState(minWidth)

  useEffect(()=>{
    setWidth(stored_width)
  },[stored_width])

  const boxRef = useCallback(node=>{
    if(node!=null){
      setMaxWidth(node.clientWidth-60)
    }
  })
  //
  return (
    <Box mb={2} ref={boxRef}>
      <AppBar position="static" sx={{backgroundColor:"#3c6d9e"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            Slide size
          </Typography>
          <Box sx={{ width: 300 }} px={2}>
          <AppSlider
            aria-label="Temperature"
            value={width}
            valueLabelDisplay="auto"
            step={200}
            marks
            min={minWidth}
            max={maxWidth}
            onChange={(e,newValue)=>{setWidth(newValue);setStoredWidth(newValue)}}
          />
    </Box>
        </Toolbar>
      </AppBar>
      <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center" justifyContent="space-evenly">
        {list.map((file,index)=>
          <Grid item key={index} xs={2} sx={{minWidth:width}}>
            <PanZoomSlide src={file} width={width} menu/>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
