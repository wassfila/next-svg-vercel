import Head from 'next/head'
import PanZoomRows from '../components/PanZoomRows'

const svg_list =[
  {file:'Linux_kernel_map.svg',rows:2,cols:2},
  {file:'tiger2.svg',rows:1,cols:1},
  {file:'nRF52.svg',rows:1,cols:2},
  {file:'long_diag.svg',rows:2,cols:1},
  {file:'tiger.svg',rows:1,cols:1},
  {file:'vintage-flourish-divider-7.svg',rows:1,cols:2},
  {file:'nRF52.svg',rows:1,cols:2},
]

export default function PanZoom() {

  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <PanZoomRows list={svg_list} thumbnails={true}/>
    </>
  )
}
