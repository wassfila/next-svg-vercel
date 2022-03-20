import React, { useRef, useState, useEffect} from 'react';
import panzoom from 'panzoom';
import {    Paper, Box, Divider, Stack, Button } from '@mui/material';
import PanZoomModal from '../components/PanZoomModal'
import PositionButton from '../components/PositionButton'
import * as utl from './svg_utils'
import SVG from 'react-inlinesvg';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import EditIcon from '@mui/icons-material/Edit';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import WidthIcon from '../public/width.svg'
import LinkIcon from '@mui/icons-material/Link';

//needed to update state and use it outside react DOM on mouse event listener. See :
//https://stackoverflow.com/questions/53845595/wrong-react-hooks-behaviour-with-event-listener
function useStateRef(initialValue) {
  const [value, setValue] = useState(initialValue);

  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return [value, setValue, ref];
}

export default function PanZoomSlide({src,menu=false,width=600}) {
  const text_list = useRef(new Array())
  const started = useRef(false)
  const [focus, setFocus,refFocus] = useStateRef(false)
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(false);
  const [height,setHeight] = useState(Math.round(width/2))

  const zoomOptions = {
    minZoom: 0.1,
    maxZoom:4,
    beforeWheel:(e)=>!refFocus.current
    }
  const boxRef = useRef(null);
  const divRef = useRef(null);
  const panzoomRef = useRef(null);
  const stackRef = useRef(null);

  function onFocusOut(){
    //stopPZ()
    setFocus(false)
    //console.log("focus out")
  }
  function onMouseDown(){
    startPZ()//protected against restarts
    //console.log(`refFocus(${refFocus.current})`)
    setFocus(true)
  }
  function onComponentUnmount(){
    stopPZ()
    //console.log("removing listener")//TODO not clear why this runs on startup before Mount ?
    if(divRef.current){
      boxRef.current.removeEventListener("mousedown",onMouseDown)
      boxRef.current.removeEventListener("focusout", onFocusOut)
    }
  }

  function startPZ(){
    if(loaded && divRef.current && !started.current){
      panzoomRef.current = panzoom(divRef.current, zoomOptions);
      started.current = true
      utl.Fit(src,panzoomRef.current,boxRef.current)
      //panzoomRef.current.on('transform', function(e) {});
      //console.log("pan zoom : created")
    }
  }
  function stopPZ(){
    //console.log(`stopPZ panzoomRef.current=${panzoomRef.current}`)
    if((started.current) && (panzoomRef.current)){
      panzoomRef.current.dispose();
      started.current = false
      //console.log(`pan zoom : disposed`)
    }
  }
  
  useEffect(()=>{
    //console.log(`width is now (${width})`)
    const target_height = Math.round(width/2)
    if(height!=target_height){  //1) height only mismatch if width has changed
      setHeight(target_height)
    }else{                    //2) height match, already applied after render
      //console.log(`fitting '${src}' now with new width (${width})`)
      utl.Fit(src,panzoomRef.current,boxRef.current)
    }
  },[height,width])

  useEffect(() => {
    if((loaded) && (divRef.current) && (!started.current)){
      //console.log("adding listener")
      boxRef.current.addEventListener("mousedown", onMouseDown,true)
      boxRef.current.addEventListener("focusout", onFocusOut)
      let svg = document.getElementById(src)
      if(svg != null){
        startPZ()
        stopPZ()
        if(src == "long_diag2.svg"){
          utl.setup_links(src,"long_diag2.json",text_list)
        }else if(src == "nRF52.svg"){
          utl.setup_links(src,"nRF52.json",text_list)
        }

      }
    }
    return onComponentUnmount
  }, [loaded]);
  function onButtonFit(){
    startPZ()
    utl.Fit(src,panzoomRef.current,boxRef.current)
  }
  function onButtonTop(){
    //unused, was used with <WidthIcon/>
    startPZ()
    utl.Top(src,panzoomRef.current,boxRef.current)    
  }
  return (
    <>
    <Box id="mainContent" m={1} sx={{width:width, border: focus?'2px solid':'0px',cursor:'grab'}}>
      <Paper elevation={focus?10:2} sx={{ overflow: 'hidden'}}>
        <Stack  id={`pz-${src}`} ref={stackRef}>
        {menu&&
          <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          >
          <Button sx={{zIndex:'modal',backgroundColor:'#ffffffaa'}} onClick={()=>{onButtonFit()}} variant="text"><FitScreenIcon/> fit</Button>
          <Button sx={{zIndex:'modal',backgroundColor:'#ffffffaa'}} onClick={()=>{setOpen(true)}} variant="text"><FullscreenIcon/></Button>
        </Stack>
        }
            <Box ref={boxRef} 
                 sx={{  height:height,  position:'relative'}}>
                {false &&
                <>
                  <PositionButton position="tr" onClick={()=>{setOpen(true)}}>
                  <FullscreenIcon/></PositionButton>
                  <PositionButton position="tl" onClick={()=>{onButtonFit()}}>
                  <FitScreenIcon/></PositionButton>
                </>}
                <div ref={divRef} >
                  <SVG src={src} id={src} onLoad={()=>{setLoaded(true)}} />
                </div>
            </Box>
            </Stack>
        </Paper>
    </Box>
    <PanZoomModal src={src} open={open} handleClose={()=>{setOpen(false)}}/>
    </>
  )
}
