import Head from 'next/head'
import {useRef, useEffect} from 'react';
import {    Paper, Grid,Box, Divider,
  Typography, Slider,  Stack } from '@mui/material';
import { UncontrolledReactSVGPanZoom,ReactSVGPanZoom } from 'react-svg-pan-zoom';

export default function Home() {
  const Viewer = useRef(null);

  useEffect(() => {
    Viewer.current.fitToViewer();
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
          <UncontrolledReactSVGPanZoom
        ref={Viewer}
        width={500} height={500}
      >
        <svg width={617} height={316}>
          <g fillOpacity=".5" strokeWidth="4">
            <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
            <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
            <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
            <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
          </g>
        </svg>
      </UncontrolledReactSVGPanZoom>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
