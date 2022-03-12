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
import WidthIcon from '../public/width.svg'

export default function PanZoomSlide({src,menu=false,height=400}) {
  const started = useRef(false)
  const [focus, setFocus] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(false);

  const boxHeight = height
  const zoomOptions = {minZoom: 0.1, maxZoom:4}
  const boxRef = useRef(null);
  const divRef = useRef(null);
  const panzoomRef = useRef(null);
  const stackRef = useRef(null);

  function onFocusOut(){
    stopPZ()
    setFocus(false)
    console.log("focus out")
  }
  function onMouseDown(){
    startPZ()
    setFocus(true)
    //window.setTimeout(()=>{boxRef.current.focus();console.log("focus")},50)
  }
  function onComponentUnmount(){
    stopPZ()
    //console.log("removing listener")//TODO not clear why this runs on startup before Mount ?
    if(divRef.current){
      boxRef.current.removeEventListener("mousedown",onMouseDown)
      boxRef.current.removeEventListener("focusout", onFocusOut)
    }
  }

  function startPZ(){
    if(loaded && divRef.current && !started.current){
      panzoomRef.current = panzoom(divRef.current, zoomOptions);
      started.current = true
      //console.log("pan zoom : created")
    }
  }
  function stopPZ(){
    //console.log(`stopPZ panzoomRef.current=${panzoomRef.current}`)
    if((started.current) && (panzoomRef.current)){
      panzoomRef.current.dispose();
      started.current = false
      //console.log(`pan zoom : disposed`)
    }
  }
  
  useEffect(() => {
    if(loaded && divRef.current){
      //console.log("adding listener")
      boxRef.current.addEventListener("mousedown", onMouseDown,true)
      boxRef.current.addEventListener("focusout", onFocusOut)
      let svg = document.getElementById(src)
      if(svg != null){
        startPZ()
        utl.Fit(src,panzoomRef.current,boxRef.current)
        stopPZ()
      }
    }
    return onComponentUnmount
  }, [loaded]);
  function TestSVGjs(src){
    let svg = document.getElementById(src)
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
    <>
    <Box id="mainContent" m={1} sx={{width:boxHeight*2, border: focus?'2px solid':'0px',cursor:'grab'}}>
      <Paper elevation={focus?10:2}>
        <Stack  id={`pz-${src}`} ref={stackRef}>
        {menu&&
          <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          justifyContent="center"
          >
          <Button onClick={()=>{onMouseDown();utl.Fit(src,panzoomRef.current,boxRef.current)}}
                  variant="text"><FitScreenIcon/> fit</Button>
          <Button onClick={()=>{onMouseDown();utl.Top(src,panzoomRef.current,boxRef.current)}}
                  variant="text"><WidthIcon/></Button>
          <Button onClick={()=>{TestSVGjs(src)}} variant="text"><EditIcon/></Button>
          <Button onClick={()=>{setOpen(true)}} variant="text" id={`pz-fs-${src}`}><FullscreenIcon/></Button>
        </Stack>
        }
            <Box ref={boxRef} 
                 sx={{  height:boxHeight, overflow: 'hidden'}}>
                <div ref={divRef} >
                  <SVG src={src} id={src} onLoad={()=>{setLoaded(true)}} />
                </div>
            </Box>
            </Stack>
        </Paper>
    </Box>
    <PanZoomModal src={src} open={open} handleClose={()=>{setOpen(false)}}/>
    </>
  )
}