import Head from 'next/head'
import {useRef, useEffect} from 'react';
import {    Paper, Grid,Box, Divider,
  Typography, Slider,  Stack } from '@mui/material';
import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom'
import {ReactSvgPanZoomLoader} from 'react-svg-pan-zoom-loader'

export default function Home() {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box m={1}>
        <Paper elevation={3} >
          <Box px={2} pt={1}>
          <ReactSvgPanZoomLoader src="/tiger.svg" render= {(content) => (
            <UncontrolledReactSVGPanZoom width={800} height={600}>
                <svg width={800} height={600} >
                    {content}
                </svg>  
            </UncontrolledReactSVGPanZoom>
          )}/>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
