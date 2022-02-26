import Head from 'next/head'
import React, { useRef, useLayoutEffect } from 'react';
import panzoom from 'panzoom';
import {    Paper, Grid,Box, Divider,
  Typography, Slider,  Stack } from '@mui/material';
import Tiger from '../../public/tiger.svg';

export default function PanZoom() {
  const elementRef = useRef(null);
  const panzoomRef = useRef(null);

  useLayoutEffect(() => {
      panzoomRef.current = panzoom(elementRef.current, {minZoom: .25,maxZoom: 4});
      return () => {panzoomRef.current.dispose();}
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box id="mainContent" m={1}>
        <Paper elevation={3} >
          <Box id="allCard" px={2} pt={1}>
          <div ref={elementRef}>
            <Tiger/>
          </div>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
