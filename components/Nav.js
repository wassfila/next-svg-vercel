import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from 'next/link'

const pages = [
    {'name':'Masonry'    ,'href':''},
    {'name':'Grid'    ,'href':'grid'},
    {'name':'Quilted'    ,'href':'rows'},
]


export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                {pages.map((page,index)=>(
                    <Link href={`/${page.href}`} key={index}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {page.name}
                            </Typography>
                        </Button>
                    </Link>          
            ))}
            </Toolbar>
        </AppBar>
    </Box>
  );
}

