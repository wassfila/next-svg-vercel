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

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function PanZoomList({list,thumbnails=false}) {
  const thumb_width = 300
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
        <ImageList variant="quilted" cols={nbcols} gap={8} sx={{ minWidth:600 }}>
            {thumb_list.map((item,index) => (
            <Box key={index} m={1}>
              <Paper >
                <ImageListItem rows={item.rows || 1} cols={item.cols || 1}>
                <img width={thumb_width}
                  {...srcset(item.thumb, 300, item.rows, item.cols)}
                  alt={item.href}
                  loading="lazy"
                  onClick={()=>{document.getElementById(`pz-fs-${item.name}.svg`).click()}}
                  style={{cursor:"zoom-in"}}
                />
                <ImageListItemBar 
                  position="below"
                />
                  <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="h6" component="div" ml={2} sx={{ flexGrow: 1 }}>
                                        {item.name}
                      </Typography>
                      <IconButton
                        sx={{ color: 'black' }}
                        aria-label={`star ${item.title}`}
                        href={`#${item.href}`}
                      >
                        <KeyboardArrowDownIcon />
                      </IconButton>
                  </Stack>  
                </ImageListItem>
              </Paper>
            </Box>
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
