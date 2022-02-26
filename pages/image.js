import Head from 'next/head'
import PanZoomComp from '../components/PanZoomComp'

const svg_list =[
  'nRF52.svg',
  'tiger.svg',
  'vintage-flourish-divider-7.svg',
]

export default function PanZoom() {
  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      {svg_list.map((file,index)=>
        <PanZoomComp key={index}>
          <img src={file}/>
        </PanZoomComp>      
      )}
    </>
  )
}
