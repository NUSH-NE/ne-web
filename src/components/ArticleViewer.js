/*
Here's some unused code:
reactHtmlReplace(article.body?.replace(/&nbsp;/g, '\u00a0'), (t, props) => {
                    switch (t) {
                        case 'a':
                            return <Link {...props} />
                        case 'h1':
                        case 'h2':
                        case 'h3':
                        case 'h4':
                        case 'h5':
                        case 'h6':
                            return <Typography variant={t} gutterBottom />
                        case 'p':
                        case 'span':
                            return <Typography gutterBottom />
                        case 'iframe':
                            return <iframe {...props} title={props.src} />
                        case 'li':
                            return <li />
                        case 'ol':
                            return <ol />
                        case 'ul': return <ul />
                        case 'table': return <table />
                        case 'tbody': return <tbody />
                        case 'td': return <td />
                        case 'tr': return <tr />
                        default:
                            console.log(t, props);
                            return <></>
                    }
 */

import '../css/article.css';

import {
    Slide,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Container,
    Paper,
    Skeleton,
    Link,
    Tooltip,
    Divider
} from '@material-ui/core';
import { forwardRef, memo, useEffect, useState } from 'react';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';

import DomPurify from 'dompurify';

import { motion } from 'framer-motion';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

// Allow YouTube iframes
DomPurify.addHook('uponSanitizeElement', (node, data) => {
    if (data.tagName === 'iframe') {
        const src = node.getAttribute('src') || '';
        if (!src.startsWith('https://www.youtube.com/embed/')) return node.parentNode.removeChild(node);
    }
});

function ArticleViewer({article, open, setOpen}) {
    const [picLoading, setPicLoading] = useState(true);

    useEffect(() => {
        setPicLoading(true);
    }, [open]);

    return <Dialog fullScreen open={open} TransitionComponent={Transition} PaperProps={{elevation: 8}}>
        <AppBar sx={{ position: 'fixed' }}>
            <Toolbar>
                <IconButton
                    edge='start'
                    color='inherit'
                    onClick={() => setOpen(false)}
                    aria-label='close'>
                    <CloseRoundedIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div' noWrap>
                    {article.title}
                </Typography>

                <Tooltip title='Upvote'>
                    <IconButton sx={{p: 0, m: .75, mb: 0}}>
                        <motion.span whileHover={{y: [null, -4, 0]}} whileTap={{scale: [null, 1.2, 1.2]}} animate={{scale: [null, 1, 1]}}
                                     transition={{duration: .4}} style={{display: 'flex', padding: 12}}>
                            <ArrowUpwardRoundedIcon />
                        </motion.span>
                    </IconButton>
                </Tooltip>
                <Typography variant='subtitle2' color='text.secondary' align='center'>
                    0
                </Typography>
                <Tooltip title='Downvote'>
                    <IconButton sx={{p: 0, m: .75, mb: 0}}>
                        <motion.span whileHover={{y: [null, 4, 0]}} whileTap={{scale: [null, 1.2, 1.2]}} animate={{scale: [null, 1, 1]}}
                                     transition={{duration: .4}} style={{display: 'flex', padding: 12}}>
                            <ArrowDownwardRoundedIcon />
                        </motion.span>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
        <Toolbar />

        <Container sx={{'& *': {fontFamily: '"Roboto Slab", "Noto Sans", Roboto!important'}, mt: 8, mb: 4}} maxWidth='md'>
            <Paper sx={{overflow: 'hidden', display: 'flex', width: 'fit-content'}} elevation={12}>
                <img style={{maxWidth: 'min(100%, 720px)'}} onLoad={() => setPicLoading(false)} src={article.imgURL
                ?? `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/720/405.webp?s=${Math.floor(Math.random() * 1000)}`}
                     alt={article.title} />
            </Paper>
            {
                picLoading && <Skeleton width='min(100%, 720px)' animation='wave'
                                        sx={{transform: 'none!important', borderRadius: t => t.shape.borderRadius + 'px'}}>
                    <div style={{ paddingTop: '57%' }} />
                </Skeleton>
            }
            <Typography variant='h2' mt={4} mb={1}>{article.title}</Typography>
            <Typography variant='subtitle2' gutterBottom>Written by {article.uid} on {new Date(article.time).toString()}</Typography>

            <Divider sx={{my: 2}} />

            <div dangerouslySetInnerHTML={{__html: DomPurify.sanitize(article.body, {
                    ADD_TAGS: ['iframe'], // or ALLOWED_TAGS
                    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'], //or ALLOWED_ATR
                })}} className='artCont' />
        </Container>
        <Paper sx={{width: '100%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, p: 2}}>
            <Typography variant='subtitle2' gutterBottom align='center'>
                Written by NUS High teachers and NE community contributors
            </Typography>
            <Typography variant='caption' align='center' display='block' color='text.secondary'>
                Spotted a problem, or have a suggestion?
                Drop us a letter at <Link href='mailto:nushnationaledu@gmail.com'>nushnationaledu@gmail.com</Link>
            </Typography>
        </Paper>
    </Dialog>
}

export default memo(ArticleViewer);
