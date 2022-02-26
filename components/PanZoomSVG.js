import React, { useRef, useState, useEffect} from 'react';
import panzoom from 'panzoom';
import {    Paper, Box, Divider, Stack, Button } from '@mui/material';
import PanZoomModal from '../components/PanZoomModal'
import * as utl from './svg_utils'
import { SVG as SVGjs } from '@svgdotjs/svg.js'
import SVG from 'react-inlinesvg';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function PanZoom({src}) {
  const started = useRef(false)
  const [active, setActive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(false);

  const boxHeight = 400
  const zoomOptions = {minZoom: 0.1, maxZoom:4}
  const boxRef = useRef(null);
  const divRef = useRef(null);
  const panzoomRef = useRef(null);
  const stackRef = useRef(null);

  function onMouseDown(){
    startPZ()
    setActive(true)
  }
  function onComponentUnmount(){
    stopPZ()
    //console.log("removing listener")//TODO not clear why this runs on startup before Mount ?
    if(divRef.current){
      boxRef.current.removeEventListener("mousedown",onMouseDown)
    }
  }

  function startPZ(){
    if(loaded && divRef.current && !started.current){
      panzoomRef.current = panzoom(divRef.current, zoomOptions);
      started.current = true
      console.log("pan zoom : created")
    }
  }
  function stopPZ(){
    //console.log(`stopPZ panzoomRef.current=${panzoomRef.current}`)
    if((started.current) && (panzoomRef.current)){
      panzoomRef.current.dispose();
      started.current = false
      console.log(`pan zoom : disposed`)
    }
  }
  
  useEffect(() => {
    if(loaded && divRef.current){
      //console.log("adding listener")
      boxRef.current.addEventListener("mousedown", onMouseDown,true)
    }
    return onComponentUnmount
  }, [loaded]);
  function TestSVGjs(e){
    let svg = divRef.current.getElementsByTagName('svg')[0]
    if(svg){
      let draw = SVGjs(svg)
      draw.rect(100, 100).fill('#f06')
      let text = draw.findOne('text')
      if(text){
        text.fill('#f06')
      }
    }
  }
  return (
    <Stack ref={stackRef} mt={1}>
    <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="center"
    >
        <Button onClick={()=>{onMouseDown();utl.Fit(panzoomRef.current,divRef.current,boxRef.current)}}
                variant="text"><FitScreenIcon/> fit</Button>
        <Button onClick={()=>{onMouseDown();utl.Top(panzoomRef.current,divRef.current,boxRef.current)}}
                variant="text"><ArrowUpwardIcon/></Button>
        <Button onClick={(e)=>{stopPZ();setActive(false)}}
                variant="text"><CloseIcon/></Button>
        <Button onClick={TestSVGjs} variant="text"><EditIcon/></Button>
        <Button onClick={()=>{setOpen(true)}} variant="text"><FullscreenIcon/></Button>
    </Stack>
    <Box id="mainContent" m={1} sx={{border: active?'2px solid':'0px', cursor:'grab'}}>
        <Paper elevation={active?10:2}>
            <Box ref={boxRef} 
                 sx={{  height:boxHeight, overflow: 'hidden'}}>
                <div ref={divRef} >
                  <SVG src={src} onLoad={()=>{setLoaded(true)}} />
                </div>
            </Box>
        </Paper>
    </Box>
    <PanZoomModal src={src} open={open} handleClose={()=>{setOpen(false)}}/>
    </Stack>
  )
}
