import panzoom from 'panzoom';

function get_svg_size(src){
  let svg = document.getElementById(src)
  let bbox = svg.getBBox();
  return {svg_width:bbox.width,svg_height:bbox.height}
}


function softReset(pzRef){
  if(! pzRef) return
  pzRef.zoomAbs(0, 0, 1);
  pzRef.moveTo(0, 0);
}

function Reset(pzRef,divRef,zoomOptions){
  if(! pzRef) return null
  pzRef.dispose();
  return panzoom(divRef, zoomOptions);
}

function Center(src,pzRef,boxRef){
  if(! pzRef) return null
  //pzRef = Reset(pzRef,divRef,zoomOptions)
  softReset(pzRef)
  let svg = document.getElementById(src)
  //let cbox = svg.getBoundingClientRect();
  let {svg_width, svg_height} = get_svg_size(src)
  let scale = boxRef.clientWidth / svg_width
  if(svg.hasAttributeNS(null,"width")){
    let client_width = svg.getAttributeNS(null,"width")
    if(client_width.endsWith("px")){
      client_width = Number(client_width.slice(0,-2))
    }
    scale = client_width / svg_width
  }
  let offsetY         = boxRef.clientHeight/2 - (svg_height*scale)/2
  let offsetX         = boxRef.clientWidth/2 - (svg_width*scale)/2
  pzRef.moveTo(offsetX, offsetY);
  console.log(`moveto (${offsetX},${offsetY})`)
  return
}

function FitHeight(src,pzRef,boxRef){
  if(! pzRef) return
  softReset(pzRef)
  let svg = document.getElementById(src)
  //let cbox = svg.getBoundingClientRect();
  let {svg_width, svg_height} = get_svg_size(src)
  let scale = boxRef.clientWidth / svg_width
  if(svg.hasAttributeNS(null,"width")){
    let client_width = svg.getAttributeNS(null,"width")
    if(client_width.endsWith("px")){
      client_width = Number(client_width.slice(0,-2))
    }
    scale = client_width / svg_width
  }
  //console.log(`scale = ${scale}`)
  let offsetY         = boxRef.clientHeight/2 - (svg_height*scale)/2
  let offsetX         = boxRef.clientWidth/2 - (svg_width*scale)/2
  pzRef.moveTo(offsetX, offsetY);
  //console.log(`moveTo (${offsetX},${offsetY})`)

  let cbox = svg.getBoundingClientRect();
  let zoomX           = boxRef.clientWidth/2
  let zoomY           = boxRef.clientHeight/2
  let fit_height_zoom  = boxRef.clientHeight/(svg_height*scale)
  pzRef.zoomAbs(zoomX, zoomY, fit_height_zoom);
  //console.log(`zoomAbs (${zoomX},${zoomY},${fit_height_zoom})`)
}
function FitWidth(src,pzRef,boxRef){
  if(! pzRef) return
  softReset(pzRef)
  let svg = document.getElementById(src)
  //let cbox = svg.getBoundingClientRect();
  let {svg_width, svg_height} = get_svg_size(src)
  let scale = boxRef.clientWidth / svg_width
  if(svg.hasAttributeNS(null,"width")){
    let client_width = svg.getAttributeNS(null,"width")
    if(client_width.endsWith("px")){
      client_width = Number(client_width.slice(0,-2))
    }
    scale = client_width / svg_width
  }
  //console.log(`scale = ${scale}`)
  let offsetY         = boxRef.clientHeight/2 - (svg_height*scale)/2
  let offsetX         = boxRef.clientWidth/2 - (svg_width*scale)/2
  pzRef.moveTo(offsetX, offsetY);
  //console.log(`moveTo (${offsetX},${offsetY})`)

  let cbox = svg.getBoundingClientRect();
  let fit_width_zoom  = boxRef.clientWidth/(svg_width*scale)
  let zoomX           = boxRef.clientWidth/2
  let zoomY           = boxRef.clientHeight/2
  pzRef.zoomAbs(zoomX, zoomY, fit_width_zoom);
}

function Fit(src,pzRef,boxRef){
  if(! pzRef) return
  let {svg_width, svg_height} = get_svg_size(src)
  let svg_ratio = svg_width / svg_height
  let box_ratio = boxRef.clientWidth / boxRef.clientHeight
  if(svg_ratio > box_ratio){
    FitWidth(src,pzRef,boxRef)
  }else{
    FitHeight(src,pzRef,boxRef)
  }
}
function Top(src,pzRef,boxRef){
  if(! pzRef) return
  softReset(pzRef)
  let svg = document.getElementById(src)
  //let cbox = svg.getBoundingClientRect();
  let {svg_width, svg_height} = get_svg_size(src)
  let scale = boxRef.clientWidth / svg_width
  if(svg.hasAttributeNS(null,"width")){
    let client_width = svg.getAttributeNS(null,"width")
    if(client_width.endsWith("px")){
      client_width = Number(client_width.slice(0,-2))
    }
    scale = client_width / svg_width
  }
  //console.log(`scale = ${scale}`)
  let offsetY         = boxRef.clientHeight/2 - (svg_height*scale)/2
  let offsetX         = boxRef.clientWidth/2 - (svg_width*scale)/2
  pzRef.moveTo(offsetX, 0);
  //console.log(`moveTo (${offsetX},${offsetY})`)

  let cbox = svg.getBoundingClientRect();
  let fit_width_zoom  = boxRef.clientWidth/(svg_width*scale)
  let zoomX           = boxRef.clientWidth/2
  let zoomY           = boxRef.clientHeight/2
  pzRef.zoomAbs(zoomX, zoomY, fit_width_zoom);
}
export{
  Fit,
  Top,
  softReset,
  Reset,
  Center,
  FitHeight,
  FitWidth
}
