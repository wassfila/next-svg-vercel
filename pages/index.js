import Head from 'next/head'
import PanZoomSVG from '../components/PanZoomSVG'
import {useState} from 'react';

const svg_list =[
  'Linux_kernel_map.svg',
  'tiger2.svg',
  'tiger.svg',
  'vintage-flourish-divider-7.svg',
  'nRF52.svg',
]

export default function PanZoom() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      {svg_list.map((file,index)=>
        <PanZoomSVG key={index} src={file}/>
      )}
    </>
  )
}
