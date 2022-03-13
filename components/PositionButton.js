import { Button } from '@mui/material';
import { useState, useEffect} from 'react';

const buttonActiveStyle = {
    color:'#0036bb',
    backgroundColor:'#ffffff',
    position: 'absolute',
    justifyContent: 'center',
}

const buttonRestStyle = {
    color:'#0036bb55',
    backgroundColor:'#ffffff55',
    '&:hover':{color:'#0036bb',backgroundColor:'#ffffff'},
    position: 'absolute',
    justifyContent: 'center',
}
  
const PositionButton = ({children,position,onClick})=>{
    const [active, setActive] = useState(true)
    let activeStyle = buttonActiveStyle
    let restStyle = buttonRestStyle
    if(position == "tr"){
        activeStyle.zIndex = "modal"
        restStyle.zIndex   = "modal"
        activeStyle.top = "1%"
        activeStyle.right = "1%"
        restStyle.top = "1%"
        restStyle.right = "1%"
    }else if(position == "tl"){
        activeStyle.zIndex = "modal"
        restStyle.zIndex   = "modal"
        activeStyle.top = "1%"
        activeStyle.left = "1%"
        restStyle.top = "1%"
        restStyle.left = "1%"
    }else{
        console.log("neither nor")
    }

    useEffect(()=>{
        setActive(true)
        setTimeout(()=>{setActive(false)},2000)
    },[]);

    return(
        <Button onClick={onClick}
              variant="conained"
              sx={active?activeStyle:restStyle}
        >
            {children}
        </Button>
    )
}

  export default PositionButton
