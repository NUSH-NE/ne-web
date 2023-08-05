import { Box, Button, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography, CardActions } from '@material-ui/core';

// Icons
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';

import { motion } from 'framer-motion';

export default function PhotoCard({d, preview, previewOpen}) {
    const openPreview = () => {
        preview({
            src: d.imgURL,
            caption: d.desc,
            title: d.title
        });
        previewOpen(true);
    }

    return <Card sx={{width: 320}}>
        <CardActionArea onClick={openPreview}>
            <CardMedia
                sx={{ aspectRatio: '16/9', backgroundPosition: 'top'}}
                image={d.imgURL}
                title={d.title}
            />
            <CardContent>
                <Typography gutterBottom variant='h6' component='div'
                            sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{d.title}</Typography>
                <Typography variant='body2' color='text.secondary' gutterBottom>by {d.authorName}</Typography>
                <Typography variant='body2' color='text.secondary' sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {d.desc}</Typography>
            </CardContent>
        </CardActionArea>

        <CardActions>
            <Button size='small' onClick={openPreview}>
                View
            </Button>
            <Box flexGrow={1} />

            {/*<IconButton sx={{p: 0}}>*/}
            {/*    <motion.span whileHover={{rotate: [null, -16, 0]}}*/}
            {/*                 transition={{duration: .4}} style={{display: 'flex', padding: 6.4}}>*/}
            {/*        <ThumbUpRoundedIcon fontSize='small' />*/}
            {/*    </motion.span>*/}
            {/*</IconButton>*/}
            {/*<IconButton sx={{p: 0}}>*/}
            {/*    <motion.span whileHover={{rotate: [null, 16, 0]}}*/}
            {/*                 transition={{duration: .4}} style={{display: 'flex', padding: 6.4}}>*/}
            {/*        <ThumbDownRoundedIcon fontSize='small' />*/}
            {/*    </motion.span>*/}
            {/*</IconButton>*/}
        </CardActions>
    </Card>
}
