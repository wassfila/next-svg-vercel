import { useCallback, useState} from 'react';
import PanZoomSVG from '../components/PanZoomSVG'
import {Box, ImageList,ImageListItem,ImageListItemBar,
  IconButton,Button,ListSubheader  } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function PanZoomList({list,thumbnails=false}) {
  const thumb_width = 300
  const [nbcols,setNbCols] = useState(3)

  const boxRef = useCallback(node=>{
    if(node != null){
      let nb_cols = Math.ceil(node.clientWidth / thumb_width)
      console.log(`nb cols = ${nb_cols}`)
      setNbCols(nb_cols)
    }
    },[]);


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
        <Box ref={boxRef}>
        <ImageList variant="woven" cols={nbcols} gap={8} sx={{ minWidth:400 }}>
            {thumb_list.map((item,index) => (
            <ImageListItem key={index}>
              <img width={thumb_width}
                src={`${item.thumb}?fit=crop&auto=format`}
                srcSet={`${item.thumb}?fit=crop&auto=format&dpr=2 2x`}
                alt={item.href}
                loading="lazy"
                onClick={()=>{document.getElementById(`pz-fs-${item.name}.svg`).click()}}
                style={{cursor:"zoom-in"}}
              />
              <ImageListItemBar 
                position="below"
                title={item.name}
                actionIcon={
                  <IconButton
                    sx={{ color: 'black' }}
                    aria-label={`star ${item.title}`}
                    href={`#${item.href}`}
                  >
                    <KeyboardArrowDownIcon />
                  </IconButton>
                }
              />
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
