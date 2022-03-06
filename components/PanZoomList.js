import { useCallback, useState, useEffect} from 'react';
import PanZoomSVG from '../components/PanZoomSVG'
import {Box, Paper, ImageList,ImageListItem,ImageListItemBar,
  IconButton,Stack,Typography,Button,ListSubheader  } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LinkIcon from '@mui/icons-material/Link';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function PanZoomList({list,thumbnails=false,thumb_width=200}) {
  const [nbcols,setNbCols] = useState(3)
  const size = useWindowSize();

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


  let thumb_list = []
  if(thumbnails){
    thumb_list = list.map((item)=>({
      thumb:item.replace('.svg','.thumb.png'),
      href:`pz-${item}`,
      name:item.replace('.svg','')
    }))
  }
  return (
    <>
      {thumbnails &&
        <Box ref={boxRef} sx={{backgroundColor:"#e1eaf2",minWidth:(thumb_width+16)*2+16 }} p={1}>
        <ImageList variant="masonry" cols={nbcols} gap={4} sx={{ minWidth:(thumb_width+16)*2 }}>
            {thumb_list.map((item,index) => (
                <ImageListItem key={index} >
            <Box mb={1} >
              <Paper >
              <Stack
                    direction="column"
                    alignItems="center"
                  >
                    <Box p={1}>
                      <img width={thumb_width}
                        src={item.thumb}
                        alt={item.href}
                        onClick={()=>{document.getElementById(`pz-fs-${item.name}.svg`).click()}}
                        style={{cursor:"zoom-in"}}
                      />
                    </Box>
                  </Stack>
                  <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography component="div" ml={2} sx={{ flexGrow: 1, maxWidth:120 }}>
                                        {item.name}
                      </Typography>
                      <IconButton
                        sx={{ color: 'black' }}
                        aria-label={`star ${item.title}`}
                        href={`#${item.href}`}
                      >
                        <LinkIcon/>
                      </IconButton>
                  </Stack>  
                  </Paper>
            </Box>
                </ImageListItem>
          ))}
        </ImageList>
      </Box>
    }
      {list.map((file,index)=>
        <PanZoomSVG key={index} src={file}/>
      )}
    </>
  )
}
