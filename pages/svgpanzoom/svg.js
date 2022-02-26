import Head from 'next/head'
import React, { useRef, useEffect, useState } from 'react';
import Script from 'next/script'
import {    Paper, Grid,Box, Divider,
  Typography, Slider,  Stack } from '@mui/material';

export default function Home() {
  const elementRef = useRef(null);
  const panzoomRef = useRef(null);

  // Set up panzoom on mount, and dispose on unmount
  useEffect(() => {
    if(typeof svgPanZoom !== "undefined"){
      panzoomRef.current = svgPanZoom(elementRef.current);
    }
    return () => {
      if(panzoomRef.current){
        panzoomRef.current.destroy();
      }
    }
  }, []);
  return (
      <>
        <Script src='/dist/svg-pan-zoom.min.js'
          onLoad={() => {
            if(typeof window !== "undefined"){
              panzoomRef.current = svgPanZoom(elementRef.current);
            }
          }}
        />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box id="mainContent" m={1}>
        <Paper elevation={3} >
          <Box id="allCard" px={2} pt={1}>
            <svg ref={elementRef}>
              <g id='scene'> 
                <circle cx='10' cy='10' r='5' fill='pink'></circle>
              </g>
            </svg>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
