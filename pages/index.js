import Head from 'next/head'
import SlidesList from '../components/SlidesList'
import {Typography  } from '@mui/material';
import svg_list from './slides_files.json'

const description = `This example shows how to create a list of interactive Slides out of an svg images files list`

export default function PanZoom() {

  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography p={1}>{description}</Typography>
      <SlidesList list={svg_list}/>
    </>
  )
}
