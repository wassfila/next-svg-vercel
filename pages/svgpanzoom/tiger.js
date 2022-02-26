import Head from 'next/head'
import React, { useRef, useEffect, useState } from 'react';
import Script from 'next/script'
import {    Paper, Grid,Box, Divider,
  Typography, Slider,  Stack } from '@mui/material';

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  const elementRef = useRef(null);
  const panzoomRef = useRef(null);
  const height = 300

  useEffect(() => {
    if(loaded){
      if(typeof svgPanZoom !== "undefined"){
        panzoomRef.current = svgPanZoom(elementRef.current);
      }
    }
    return () => {
      if(panzoomRef.current){
        panzoomRef.current.destroy();
      }
    }
  }, [loaded]);
  function onLoad(){
    console.log("onLoad")
    setLoaded(true)
  }
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
        <Box id="allCard" px={2} pt={1} sx={{ height:height,width:1100, overflow: 'hidden' }}>
            <embed type="image/svg+xml" src="/tiger.svg" ref={elementRef} id="my-embed" onLoad={onLoad}/>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
