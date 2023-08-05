import { AppBar, Backdrop, Box, IconButton, Toolbar, Typography, Tooltip } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';

// Cursors
import zoomIn from '../assets/cursors/zoom-in.png';
import zoomOut from '../assets/cursors/zoom-out.png';

// Icons
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

// Framer motion
import { motion } from 'framer-motion';

const ANIM_DURATION = 200; // ms
const ZOOM_VAL = 200; // %
const MOUSE_MARGIN = 20; // %

export default function PhotoPostViewer({open, setOpen, src, caption, title}) {
    const [isZoomed, setIsZoomed] = useState(false),
        [style, setStyle] = useState(
            {backgroundPositionX: 'center', backgroundPositionY: 'center', backgroundSize: 'contain',
                transition: `background-position ${ANIM_DURATION}ms linear, background-size ${ANIM_DURATION}ms linear`
            }),
        ignore = useRef(false),
        imageSize = useRef({width: 0, height: 0}),
        zoomDiv = useRef();

    useEffect(() => {
        if (!open) {
            setIsZoomed(false);
            setStyle({
                backgroundPositionX: 'center', backgroundPositionY: 'center', backgroundSize: 'contain',
                transition: `background-position ${ANIM_DURATION}ms linear, background-size ${ANIM_DURATION}ms linear`
            });
            ignore.current = false;
        }
    }, [open]);

    useEffect(() => {
        const img = new Image();
        img.onload = () => imageSize.current = {width: img.width, height: img.height};
        img.src = src;
    }, [src]);

    const posX = x => ((x - (window.innerWidth - zoomDiv.current.clientWidth)) / zoomDiv.current.clientWidth)
        * (100 + MOUSE_MARGIN * 2) - MOUSE_MARGIN + '%';
    const posY = y => ((y - (window.innerHeight - zoomDiv.current.clientHeight)) / zoomDiv.current.clientHeight)
        * (100 + MOUSE_MARGIN * 2) - MOUSE_MARGIN + '%';

    const getContainSize = (w, h, z = 100) => {
        const mag = z / 100;
        const ratio = imageSize.current.width / imageSize.current.height;
        const sRatio = w / h;
        if (ratio > 1) { // Width > Height
            if (sRatio > ratio) return `${(h * ratio) * mag}px ${h * mag}px`;
            return `${w * mag}px ${(w / ratio) * mag}px`;
        }
        else { // Height <= Width
            return `${(h * ratio) * mag}px ${h * mag}px`;
        }
    }

    const setLatestPos = e => setStyle(v => {
        return {...v,
            backgroundPositionX: posX(e.clientX),
            backgroundPositionY: posY(e.clientY)
        }
    });

    return <Backdrop component='div' open={open} sx={{flexDirection: 'column', zIndex: 14}}>
        <AppBar position='relative'>
            <Toolbar variant='dense'>
                <IconButton
                    size='small'
                    edge='start'
                    color='inherit'
                    onClick={() => setOpen(false)}
                    aria-label='close'>
                    <CloseRoundedIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div' noWrap>
                    {title}
                </Typography>

                <Tooltip title='I like this'>
                    <IconButton sx={{p: 0}}>
                        <motion.span whileHover={{rotate: [null, -16, 0]}}
                                     transition={{duration: .4}} style={{display: 'flex', padding: 6.4}}>
                            <ThumbUpRoundedIcon fontSize='small' />
                        </motion.span>
                    </IconButton>
                </Tooltip>
                <Tooltip title='I dislike this'>
                    <IconButton sx={{p: 0, ml: .5}}>
                        <motion.span whileHover={{rotate: [null, 16, 0]}}
                                     transition={{duration: .4}} style={{display: 'flex', padding: 6.4}}>
                            <ThumbDownRoundedIcon fontSize='small' />
                        </motion.span>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
        <div style={{backgroundImage: `url('${src}')`, backgroundRepeat: 'no-repeat', width: '100%', height: 'calc(100% - 48px)',
            cursor: isZoomed ? `url('${zoomOut}'), zoom-out` : `url('${zoomIn}'), zoom-in`,
            willChange: 'background-size, background-position', ...style}} ref={zoomDiv}
             onMouseLeave={() => {
                 if (isZoomed) {
                     setStyle(v => {
                         return {...v, transition: `background-position ${ANIM_DURATION}ms linear, background-size ${ANIM_DURATION}ms linear`}});
                     ignore.current = true;
                 }
             }}
             onMouseEnter={e => {
                 if (isZoomed) {
                     setLatestPos(e);
                     setTimeout(() => {
                         setLatestPos(e);
                         setStyle(v => { return {...v, transition: 'none'}});
                         ignore.current = false;
                     }, ANIM_DURATION);
                 }
             }}
             onClick={e => {
                 if (ignore.current) return;
                 if (isZoomed) {
                     ignore.current = true;
                     // Zoom back to normal size
                     setStyle(v => {
                         return {...v,
                             transition: `background-position ${ANIM_DURATION}ms linear, background-size ${ANIM_DURATION}ms linear`,
                             backgroundSize: getContainSize(zoomDiv.current.clientWidth, zoomDiv.current.clientHeight),
                             backgroundPositionX: 'center', backgroundPositionY: 'center'
                         }
                     });
                     e.target.onmousemove = null; // Remove move handler
                     // Reset backgroundSize to contain
                     setTimeout(() => {
                         setStyle(v => {
                             return {...v, backgroundSize: 'contain'}
                         });
                         setIsZoomed(false);
                         ignore.current = false;
                     }, ANIM_DURATION);
                 }
                 else {
                     ignore.current = true;
                     // First add an absolute backgroundSize value (in px)
                     setStyle(v => {
                         return {...v, backgroundSize: getContainSize(zoomDiv.current.clientWidth, zoomDiv.current.clientHeight)}
                     });
                     // Then zoom
                     requestAnimationFrame(() => {
                         setStyle(v => {
                             return {...v, backgroundSize: getContainSize(zoomDiv.current.clientWidth, zoomDiv.current.clientHeight, ZOOM_VAL)}
                         });
                         setLatestPos(e);
                     });
                     // After zoom animation has completed, attach move handlers and remove transition
                     setTimeout(() => {
                         setStyle(v => { return {...v, transition: 'none'}});
                         e.target.onmousemove = ev => {
                             if (ignore.current) return;
                             setLatestPos(ev);
                         }
                         setIsZoomed(true);
                         ignore.current = false;
                     }, ANIM_DURATION);
                 }
             }} />

        <Box position='fixed' bottom={0} left={0} right={0} zIndex={10} px={2} py={1.5} bgcolor='#000'
             sx={{opacity: isZoomed ? .2 : .6, transition: 'opacity .25s ease-in-out',
                 borderRadius: t => `${t.shape.borderRadius}px ${t.shape.borderRadius}px 0`,
                 pointerEvents: isZoomed ? 'none' : 'auto', '&:hover': isZoomed ? {} : {opacity: 1}}}>
            <Typography variant='overline' align='center' color='text.secondary' display='block' lineHeight={2}>Image Caption</Typography>
            <Typography variant='body1' align='center'>{caption}</Typography>
        </Box>
    </Backdrop>
}
