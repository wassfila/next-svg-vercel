import Head from 'next/head'
import React, { useRef, useEffect } from 'react';
import panzoom from 'panzoom';
import {    Paper, Grid,Box, Divider,
  Typography, Slider,  Stack, Item, Button } from '@mui/material';

import { SVG } from '@svgdotjs/svg.js'
export default function PanZoom({children}) {
  const height = 400
  let fit_height_zoom = 0
  let svg_width = 0
  let svg_height = 0
  const elementRef = useRef(null);
  const panzoomRef = useRef(null);

  useEffect(() => {
    panzoomRef.current = panzoom(elementRef.current, { minZoom: .25,maxZoom: 4});
    let svg = elementRef.current.getElementsByTagName('svg')[0]
    if(svg){
      svg_height = svg.getAttributeNS(null,"height")
      svg_width = svg.getAttributeNS(null,"width")
    }else{
      //console.log(elementRef.current)      
      svg_height = 600
      svg_width = 800
    }
    fit_height_zoom = height/svg_height
    FitHeight()
      return () => {panzoomRef.current.dispose();}
  }, []);
  function Reset(e){
    panzoomRef.current.dispose();
    panzoomRef.current = panzoom(elementRef.current, { minZoom: .25,maxZoom: 4});
  }
  function FitHeight(e){
    Reset()
    let offsetX = document.getElementById("allCard").clientWidth/2 - svg_width/2
    let offsetY = document.getElementById("allCard").clientHeight/2 - svg_height/2
    let zoomX = document.getElementById("allCard").clientWidth/2
    let zoomY = document.getElementById("allCard").clientHeight/2
    let fit_height_zoom = document.getElementById("allCard").clientHeight/svg_height
    panzoomRef.current.moveTo(offsetX, offsetY);
    panzoomRef.current.zoomAbs(zoomX, zoomY, fit_height_zoom);
  }
  function FitWidth(e){
    Reset()
    let offsetX = document.getElementById("allCard").clientWidth/2 - svg_width/2
    let offsetY = document.getElementById("allCard").clientHeight/2 - svg_height/2
    let zoomX = document.getElementById("allCard").clientWidth/2
    let zoomY = document.getElementById("allCard").clientHeight/2
    let fit_width_zoom = document.getElementById("allCard").clientWidth/svg_width
    panzoomRef.current.moveTo(offsetX, offsetY);
    panzoomRef.current.zoomAbs(zoomX, zoomY, fit_width_zoom);
  }
  function TestSVGjs(e){
    let svg = elementRef.current.getElementsByTagName('svg')[0]
    if(svg){
      let draw = SVG(svg)
      draw.rect(100, 100).fill('#f06')
      draw.findOne('text').fill('#f06')
    }
  }
  return (
    <Stack mt={1}>
    <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent="center"
    >
        <Button  onClick={FitHeight} variant="contained">Fit Height</Button>
        <Button  onClick={FitWidth} variant="contained">Fit Width</Button>
        <Button  onClick={TestSVGjs} variant="contained">Test SVG.js</Button>
    </Stack>
    <Box id="mainContent" m={1} >
        <Paper elevation={3} >
            <Box id="allCard" sx={{ height:height, overflow: 'hidden' }}>
                <div ref={elementRef}>
                {children}
                </div>
                </Box>
        </Paper>
    </Box>
    </Stack>
  )
}
