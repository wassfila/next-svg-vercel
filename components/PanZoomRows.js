import { useCallback, useState, useEffect} from 'react';
import PanZoomSVG from '../components/PanZoomSVG'
import {Box, Paper, ImageList,ImageListItem,ImageListItemBar,
  IconButton,Stack,Typography,Button,ListSubheader  } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

function srcset_size(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

function srcset(image) {
  return {
    src: `${image}?fit=crop&auto=format`,
    srcSet: `${image}?fit=crop&auto=format&dpr=2 2x`,
  };
}


export default function PanZoomList({list,thumbnails=false}) {
  const thumb_width = 150
  const [nbcols,setNbCols] = useState(3)
  const size = useWindowSize();

  const boxRef = useCallback(node=>{
    if(node != null){
      let nb_cols = Math.ceil(node.clientWidth / thumb_width)
      console.log(`nb cols = ${nb_cols}`)
      setNbCols(nb_cols)
    }
    },[size]);


  let thumb_list = []
  if(thumbnails){
    thumb_list = list.map((item)=>({
      thumb:item.file.replace('.svg','.thumb.png'),
      href:`pz-${item.file}`,
      name:item.file.replace('.svg',''),
      rows:item.rows,
      cols:item.cols,
    }))
  }
  return (
    <>
      {thumbnails &&
        <Box ref={boxRef}>
        <ImageList variant="quilted" cols={nbcols} gap={8} sx={{ minWidth:2*thumb_width }}>
            {thumb_list.map((item,index) => (
                <ImageListItem key={index} rows={item.rows || 1} cols={item.cols || 1} sx={{border:1}}>
                <img width={thumb_width}
                  {...srcset(item.thumb)}
                  alt={item.href}
                  loading="lazy"
                  onClick={()=>{document.getElementById(`pz-fs-${item.name}.svg`).click()}}
                  style={{cursor:"zoom-in"}}
                />
                </ImageListItem>
          ))}
        </ImageList>
      </Box>
    }
      {list.map((item,index)=>
        <PanZoomSVG key={index} src={item.file}/>
      )}
    </>
  )
}
