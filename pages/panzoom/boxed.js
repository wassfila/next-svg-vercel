import Head from 'next/head'
import React, { useRef, useEffect } from 'react';
import panzoom from 'panzoom';
import {    Paper, Grid,Box, Divider,
  Typography, Slider,  Stack, Item, Button } from '@mui/material';
import Tiger from '../../public/tiger.svg';

export default function PanZoom() {
  const height = 300
  const elementRef = useRef(null);
  const panzoomRef = useRef(null);

  useEffect(() => {
    let svg = document.getElementById('tiger');
    let w = svg.getAttributeNS(null,"width")
    let h = svg.getAttributeNS(null,"height")
    let initialX = document.getElementById("allCard").clientWidth/2 - (height/h)*(w/2)
    console.log(`clientWidth/2 = ${document.getElementById("allCard").clientWidth/2}`)
    console.log(`zoom factor = ${height/h}`)
    console.log(`small shift = ${(height/h)*(w/2)}`)
    console.log(`initialX = ${initialX}`)
    panzoomRef.current = panzoom(elementRef.current, { initialX, minZoom: .25,maxZoom: 4, initialZoom: height/h});
      console.log(`width= ${w} ; height= ${h}`)
      console.log()
      return () => {panzoomRef.current.dispose();}
  }, []);
  function Fit(e){
    panzoomRef.current.smoothZoom(0, 0, 0.5);
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box id="mainContent" m={1} >
        <Paper elevation={3} >
          <Box id="allCard" px={2} pt={1} sx={{ height:height, overflow: 'hidden' }}>
                <div ref={elementRef}>
                <Tiger id="tiger"/>
                </div>
          </Box>
        </Paper>
      </Box>
    </>
  )
}




