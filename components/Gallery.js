import { useCallback, useState, useEffect, useMemo} from 'react';
import PanZoomThumb from '../components/PanZoomThumb'
import {Box, ImageList,ImageListItem,
  Typography,Accordion,AccordionSummary,AccordionDetails  } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BurstModeIcon from '@mui/icons-material/BurstMode';

//https://usehooks.com/useWindowSize/
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export default function Gallery({list,thumb_width=200,default_expanded=false}) {
  const [expanded,setExpanded] = useState(default_expanded)
  const [nbcols,setNbCols] = useState(3)
  const size = useWindowSize();
  const slideHeight = 300

  const boxRef = useCallback(node=>{
    if(node != null){
      let col_width = thumb_width + 16      //+ImageList.gap + Box.padding
      let cwidth = node.clientWidth - 2 * 8 // minus padding
      let nb_cols = Math.floor(cwidth / col_width)
      //if(nb_cols>1){nb_cols-=1}
      //if(nb_cols>5){nb_cols=5}
      console.log(`clientw:${node.clientWidth} ; nb cols = ${nb_cols}`)
      setNbCols(nb_cols)
    }
    },[size]);

  //todo useMemo
  const thumb_list = useMemo(()=>{return list.map((item)=>({
    src:item,
    thumb:item.replace('.svg','.thumb.png'),
    href:`pz-${item}`,
    name:item.replace('.svg','')
  }))})
    
  return (
    <Box mb={2}>
        <Accordion 
          sx={{backgroundColor:"#bac9d6"}} 
          expanded={expanded}
          onChange={(e,exp)=>{console.log(exp);setExpanded(exp)}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <BurstModeIcon/>
          <Typography ml={1}>{expanded?"Click to close...":"Click to expand..."}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box ref={boxRef} sx={{backgroundColor:"#e1eaf2",minWidth:(thumb_width+16)*2+16 }} p={1}>
            <ImageList variant="masonry" cols={nbcols} gap={4} sx={{ minWidth:(thumb_width+16)*2 }}>
                {thumb_list.map((item,index) => (
                    <ImageListItem key={index} >
                      <PanZoomThumb item={item} thumb_width={thumb_width}/>
                    </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </AccordionDetails>
        </Accordion>
    </Box>
  )
}
