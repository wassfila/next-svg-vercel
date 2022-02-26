import {useWindowSize} from '@react-hook/window-size'
import {INITIAL_VALUE, TOOL_NONE,ReactSVGPanZoom} from 'react-svg-pan-zoom'
import {useRef, useState, useLayoutEffect} from 'react';
import {    Paper, Box} from '@mui/material';

export default function Resizable() {
  const Viewer = useRef(null);
  const [tool, onChangeTool] = useState(TOOL_NONE)
  const [value, onChangeValue] = useState(INITIAL_VALUE)
  const [width, height] = useWindowSize({initialWidth: 400, initialHeight: 400})

  useLayoutEffect(() => {
    Viewer.current.fitToViewer();
  }, []);


  return (
    <Box m={1}>
    <Paper elevation={3} >
      <Box px={2} pt={1}>
        <div style={{width: "100%", height: "100%"}}>
            <ReactSVGPanZoom
                width={width} height={height}
                ref={Viewer}
                value={value} onChangeValue={onChangeValue}
                tool={tool} onChangeTool={onChangeTool}
            >
                <svg width={500} height={500}>
                <g>
                    <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
                    <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
                    <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
                    <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
                </g>
                </svg>
            </ReactSVGPanZoom>
        </div>
      </Box>
    </Paper>
    </Box>
  )
}
