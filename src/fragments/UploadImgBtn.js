import { Fab, Zoom, useScrollTrigger } from '@material-ui/core';

import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import { useRef } from 'react';

export default function UploadImgBtn() {
    const f = useRef();

    const trigger = useScrollTrigger({
        disableHysteresis: true
    });

    return <>
        <Zoom in={trigger}>
            <Fab variant='extended' size='medium' color='primary' aria-label='add' onClick={() => f.current.click()}
                 sx={{position: 'fixed', left: '50%', bottom: 36, zIndex: 12, marginLeft: '-85px'}}>
                <PublishRoundedIcon sx={{ mr: 1 }} />
                Post an image
            </Fab>
        </Zoom>

        <input type='file' aria-label='' ref={f} style={{display: 'none'}} />
    </>
}
