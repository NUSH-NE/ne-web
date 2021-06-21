// Material-UI
import {
    Button,
    Paper,
    Typography,
    Box,
    IconButton,
    Tooltip,
    Divider,
    Card,
    CardContent,
    CardActions,
    CardMedia,
    CardActionArea,
    CircularProgress
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Framer Motion
import { motion } from 'framer-motion';

// Icons
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import GamesRoundedIcon from '@material-ui/icons/GamesRounded';
import PhotoRoundedIcon from '@material-ui/icons/PhotoRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';

import mainBg from './assets/img/mainBg.webp';
import SortableSectionHeader from './fragments/SortableSectionHeader';
import { useRef } from 'react';

const photoCardData = [
    { imgURL:
      'https://images.unsplash.com/photo-1623912804974-04739c6fee93?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixlib=rb-1.2.1&q=80&w=1080',
        title: 'This image looks nice right',
        user: 'Chenghoa Dong',
        desc: 'Lol i think this room looks nice because...',
        likes: -10
    },
    { imgURL:
      'https://images.unsplash.com/photo-1622559026787-732cf95eaaab?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixlib=rb-1.2.1&q=80&w=1080',
        title: 'Another Image',
        user: 'Chenghoa Dong',
        desc: 'Lol i think this room looks nice because...',
        likes: -15
    },
    { imgURL:
      'https://images.unsplash.com/photo-1622588895463-918c77b4ce4f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=720&ixlib=rb-1.2.1&q=80&w=1080',
        title: 'A third image',
        user: 'Chenghoa Dong',
        desc: 'Lol i think this room looks nice because...',
        likes: -20
    },
]

export default function App() {
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('sm'));
    const smallBtn = useMediaQuery('(max-width:380px)');
    const btnSize = smallBtn ? 'small' : (desktop ? 'large' : 'medium')

    const heroRef = useRef(null);

    return <>
        <Box minHeight='100vh' sx={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: -1,
            backgroundImage: `url('${mainBg}')`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
        <Box minHeight='100vh'>
            {
                !desktop && <Typography variant='h2' pt='12vh' gutterBottom
                            sx={{textShadow: t =>
                                    `3px 3px 4px ${t.palette.background.default}`, opacity: .9}}
                            fontFamily='Poppins, Noto Sans'
                            align='center'>NE Things</Typography>
            }
            {
                desktop && <Box minHeight='calc(100vh - 222px)' display='flex' alignItems='center' ref={heroRef}
                                justifyContent='center' position='relative' m={4}>
                    <motion.div style={{borderRadius: 24, backgroundColor: '#00000055', overflow: 'hidden', zIndex: 2, scale: 1}}
                                drag dragConstraints={heroRef} dragElastic={.2} whileTap={{scale: .85}} whileHover={{scale: 1.2}}
                                transition={{
                                    type: 'spring',
                                    mass: .5,
                                    stiffness: 200,
                                    damping: 5,
                                }}>
                        <Typography variant='h2' px={2} py={1.5} fontFamily='Poppins, Noto Sans'
                                    sx={{backdropFilter: 'blur(8px)'}}>NE Things</Typography>
                    </motion.div>
                </Box>
            }

            <Paper elevation={10} sx={{borderRadius: '36px 36px 0 0', p: '20px 18px 0'}}>
                <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
                    width: '100%', rowGap: 1, columnGap: 2}}>
                    <Typography variant='h6'>Try one of these quick actions below!</Typography>
                    <Box display='flex'>
                        <Button size={btnSize} variant='contained' sx={{mr: .25}}
                                startIcon={<DescriptionRoundedIcon />}>Crappy news</Button>
                        <Button size={btnSize} variant='contained' sx={{mx: .25}}
                                startIcon={<GamesRoundedIcon />}>Boring Games</Button>
                        <Button size={btnSize} variant='contained' sx={{ml: .25}}
                                startIcon={<PhotoRoundedIcon />}>Nasty Photos</Button>
                    </Box>
                </Box>

                <Typography align='center' variant='body1' py={1}>...or continue exploring below</Typography>
                {
                    desktop && <IconButton sx={{left: '50%', transform: 'translateX(-50%)', mb: 1}}
                                           href='#sHash'><ExpandMoreRoundedIcon /></IconButton>
                }

                <SortableSectionHeader header='Photos' mb={1} id='sHash'/>
                {
                    !desktop && <Typography variant='subtitle2' color='text.secondary' mb={1}>Top images posted this week</Typography>
                }
                <Box display='grid' gridTemplateColumns='repeat(auto-fill, minMax(280px, 1fr))' gap={1}>
                    {
                        photoCardData.map(d => <Card key={d.title}>
                            <CardActionArea>
                                <CardMedia
                                    image={d.imgURL}
                                    title={d.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant='h6' component='div'>{d.title}</Typography>
                                    <Typography variant='body2' color='text.secondary' gutterBottom>by {d.user} ({d.likes} Likes)</Typography>
                                    <Typography variant='body2' color='text.secondary'>{d.desc}</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size='small'>
                                    View
                                </Button>
                                <Box flexGrow={1} />
                                <IconButton sx={{p: .8}}><ThumbUpRoundedIcon fontSize='small' /></IconButton>
                                <IconButton sx={{p: .8}}><ThumbDownRoundedIcon fontSize='small' /></IconButton>
                            </CardActions>
                        </Card>)
                    }
                    {
                        desktop && <Card sx={{display: 'flex'}}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant='h4' color='text.secondary' component='div' align='center'>
                                        Click to load more
                                    </Typography>
                                    <Tooltip title='Loading more posts...'>
                                        <CircularProgress sx={{display: 'block', mx: 'auto'}} />
                                    </Tooltip>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    }
                </Box>

                {
                    !desktop && <Button sx={{my: 1.8, width: '100%'}} variant='contained'
                                        startIcon={<PhotoRoundedIcon />}>View More</Button>
                }

                <Divider sx={{my: 1.8, mt: desktop ? 1.8 : 0}}/>

                <Typography variant='h6'>Articles</Typography>

                {
                    !desktop && <Button sx={{my: 1.8, width: '100%'}} variant='contained'
                                        startIcon={<SubjectRoundedIcon />}>Read More</Button>
                }

                <Paper elevation={20} sx={{borderRadius: '36px 36px 0 0', p: '18px 18px 16px', m: '0 -18px', mt: 1}}>
                    <Typography variant='h4'>NUSH NE Stuff</Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Another quality product by Vincent Kwok and Wang Zerui in collaboration with the NUSH NE community
                    </Typography>
                </Paper>
            </Paper>
        </Box>
    </>
}