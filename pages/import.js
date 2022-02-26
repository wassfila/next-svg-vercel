import Head from 'next/head'
import PanZoomComp from '../components/PanZoomComp'

import DynamicnRF52 from '../public/nRF52.svg'
import DynamicTiger from '../public/tiger.svg'
import DynamicVintage from '../public/vintage-flourish-divider-7.svg'

const components = [DynamicnRF52, DynamicTiger, DynamicVintage]

export default function PanZoom() {
  return (
    <>
      <Head>
      <title>Pan Zoom</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      {components.map((Comp,index)=>
        <PanZoomComp key={index}>
          <Comp/>
        </PanZoomComp>      
      )}
    </>
  )
}
