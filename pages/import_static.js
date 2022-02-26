import Head from 'next/head'
import PanZoomComp from '../components/PanZoomComp'

const svg_list =[
  '../public/tiger.svg',
  '../public/vintage-flourish-divider-7.svg'  
]

//const DynamicTiger = dynamic(() => import(svg_list[0]))
//const DynamicVintage = dynamic(() => import(svg_list[1]))


//const components = svg_list.map((file)=>dynamic(() => import(file)))

export default function PanZoom({components}) {
  components = []
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

//export async function getStaticProps(context) {
//  let response = await fetch('http://localhost:3000/nRF52.svg')
//  let DynamicnRF52 = await response.text()
//  response = await fetch('http://localhost:3000/tiger.svg')
//  let DynamicTiger = await response.text()
//  response = await fetch('http://localhost:3000/vintage-flourish-divider-7.svg')
//  let DynamicVintage = await response.text()
//  
//  const components = [DynamicnRF52, DynamicTiger, DynamicVintage]
//
//  //TODO create svg compoent with controsuctor then return  react object
//
//  return {
//    props: {components}, // will be passed to the page component as props
//  }
//}
