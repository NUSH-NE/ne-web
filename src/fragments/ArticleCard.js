import { Box, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography, Tooltip, Skeleton } from '@material-ui/core';
import { memo } from 'react';
import { motion } from 'framer-motion';

// Icons
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';

export default memo(function ArticleCard({ imgURL, title, summary, rating, setArticle, body, hideVote, time, uid, setOpen }) {
    const isLoad =  !title || !summary || rating === null;

    return <Box pb={1.5}>
        <Card>
            <Box display='flex'>
                <Box display='flex' flexDirection='column'>
                    <Tooltip title='Upvote'>
                        <IconButton sx={{p: 0, m: .75, mb: 0}}>
                            <motion.span whileHover={{y: [null, -4, 0]}} whileTap={{scale: [null, 1.2, 1.2]}} animate={{scale: [null, 1, 1]}}
                                         transition={{duration: .4}} style={{display: 'flex', padding: 6}}>
                                <ArrowUpwardRoundedIcon />
                            </motion.span>
                        </IconButton>
                    </Tooltip>
                    <Typography variant='subtitle2' color='text.secondary' align='center'>
                        {isLoad ? <Skeleton width='50%' sx={{margin: 'auto'}} animation='wave' /> : rating}
                    </Typography>
                    <Tooltip title='Downvote'>
                        <IconButton sx={{p: 0, m: .75, mb: 0}}>
                            <motion.span whileHover={{y: [null, 4, 0]}} whileTap={{scale: [null, 1.2, 1.2]}} animate={{scale: [null, 1, 1]}}
                                         transition={{duration: .4}} style={{display: 'flex', padding: 6}}>
                                <ArrowDownwardRoundedIcon />
                            </motion.span>
                        </IconButton>
                    </Tooltip>
                    <Box flexGrow={1} />
                    <Tooltip title='Info'>
                        <motion.span whileHover={{rotate: [null, 20, 0]}} animate={{rotate: [null, 0, 0]}}
                                     transition={{duration: .4}} style={{display: 'flex', margin: '0 auto 12px auto'}}>
                            <HelpOutlineRoundedIcon />
                        </motion.span>
                    </Tooltip>
                </Box>

                <CardActionArea onClick={() => {
                    if (isLoad) return;
                    setArticle({imgURL, title, summary, rating, body, hideVote, time, uid});
                    setOpen(true);
                }}>
                    {
                        !isLoad && <>
                            <CardContent sx={{p: 1.25, pt: .75}}>
                                <Typography variant='h6' component='div'>{title}</Typography>
                                <Typography variant='body2' color='text.secondary'>{summary}</Typography>
                            </CardContent>
                            <Tooltip title={imgURL ? '' : 'This is a placeholder image - no article cover image is present'}>
                                <CardMedia
                                    sx={{ height: 0, paddingTop: '56.25%', backgroundSize: 'contain' }}
                                    image={imgURL
                                    ?? `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/720/405.webp?s=${Math.floor(Math.random() * 1000)}`}
                                />
                            </Tooltip>
                        </>
                    }
                    {
                        isLoad && <Tooltip title='Loading more articles...'>
                            <div>
                                <CardContent sx={{p: 1.25, pt: .75}}>
                                    <Skeleton animation='wave' height={32} width='30%' />
                                    <Skeleton animation='wave' height={20} width='80%' />
                                </CardContent>
                                <Skeleton animation='wave' variant='rectangular' width='100%'
                                          sx={{ height: 0, paddingTop: '56.25%' }} />
                            </div>
                        </Tooltip>
                    }
                </CardActionArea>
            </Box>
        </Card>
    </Box>
})
