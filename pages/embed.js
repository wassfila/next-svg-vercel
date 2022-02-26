import Head from 'next/head'
import PanZoomComp from '../components/PanZoomComp'

const svg_list =[
  'nRF52.svg',
]

export default function PanZoom() {
  return (
    <>
      <Head>
      <title>Embed</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      {svg_list.map((file,index)=>
        <PanZoomComp key={index}>
          <embed type="image/svg+xml" src={file}/>
        </PanZoomComp>
      )}
    </>
  )
}
