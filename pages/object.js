import Head from 'next/head'
import PanZoomSVGDoc from '../components/PanZoomSVGDoc'
import {useState} from 'react';

const svg_list =[
  'nRF52.svg',
]

export default function PanZoom() {
  const [loaded, setLoaded] = useState(false)

  function object_onload(){
    setLoaded(true)
    console.log("loaded")
  }
  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      {svg_list.map((file,index)=>
        <PanZoomSVGDoc key={index} loaded={loaded}>
          <object type="image/svg+xml" data={file} onLoad={object_onload}/>
        </PanZoomSVGDoc>
      )}
    </>
  )
}
