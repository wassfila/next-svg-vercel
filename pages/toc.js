import Head from 'next/head'
import SlidesList from '../components/SlidesList'
import {Typography  } from '@mui/material';

const description = `This example shows how to create a list of interactive Slides out of an svg images files list`
const svg_list =[
  'tiger2.svg',
  'Linux_kernel_map.svg',
  'long_diag.svg',
  'tiger.svg',
  'vintage-flourish-divider-7.svg',
  'nRF52.svg',
  'tiger.svg',
  'long_diag.svg',
  'vintage-flourish-divider-7.svg',
  'nRF52.svg',
  'tiger.svg',
  'long_diag.svg',
  'vintage-flourish-divider-7.svg',
  'nRF52.svg',
  'tiger.svg',
  'long_diag.svg',
  'vintage-flourish-divider-7.svg',
]

export default function PanZoom() {

  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography p={1}>{description}</Typography>
      <SlidesList list={svg_list} slides/>
    </>
  )
}
