import React, { useRef, useState, useCallback } from 'react';
import panzoom from 'panzoom';
import { Modal,Box } from '@mui/material';
import * as utl from './svg_utils'

import SVG from 'react-inlinesvg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90vw",
  height: "80vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'hidden',
  cursor: 'grab'
};

export default function PanZoom({src,open,handleClose}) {
  const started = useRef(false)
  const [loaded, setLoaded] = useState(false)
  
  const zoomOptions = {minZoom: 0.1, maxZoom:4}
  const panzoomRef = useRef(null)
  const boxRef = useRef(null);
  const divRef = useRef(null)

  const divMeasure = useCallback(node=>{
    divRef.current = node
    startPZ()
    },[loaded,open]);

  const boxMeasure = useCallback(node=>{
    boxRef.current = node
    startPZ()
    },[loaded,open]);
  
  function startPZ(){
    if((divRef.current != null) && (boxRef.current != null) && (loaded) && (!started.current)){
      panzoomRef.current = panzoom(divRef.current, zoomOptions);
      started.current=true
      let svg = divRef.current.getElementsByTagName('svg')[0]
      if(svg){
        utl.Fit(panzoomRef.current,divRef.current,boxRef.current)
        console.log("Modal pan zoom : created")
      }else{
        //TODO not clear why this timeout is needed, the svg is underfined otherwise
        setTimeout(()=>{
          utl.Fit(panzoomRef.current,divRef.current,boxRef.current)
          console.log("Modal pan zoom : created fitted after delay")
        },1)
      }
    }
    return
  }
  function stopPZ(){
    //console.log(`Modal: stopPZ panzoomRef.current=${panzoomRef.current}`)
    if(panzoomRef.current){
      panzoomRef.current.dispose();
      started.current=false
      console.log(`Modal pan zoom : disposed`)
    }
  }
  
  return (
      <Modal
      open={open}
      onClose={()=>{stopPZ();handleClose();}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box ref={boxMeasure} sx={style} >
        <div ref={divMeasure}>
          <SVG src={src} onLoad={()=>{setLoaded(true)}}/>
        </div>
      </Box>
    </Modal>
  )
}
