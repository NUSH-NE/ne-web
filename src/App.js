// Material-UI
import {
    Button,
    Paper,
    Typography,
    Box,
    Chip,
    IconButton,
    Divider,
    Card,
    CardContent,
    Fab,
    Collapse,
    Alert
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, createStyles } from '@material-ui/styles';

// Framer Motion
import { motion } from 'framer-motion';

// Virtuoso
import { Virtuoso } from 'react-virtuoso';

// Icons
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import GamesRoundedIcon from '@material-ui/icons/GamesRounded';
import PhotoRoundedIcon from '@material-ui/icons/PhotoRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import AnnouncementRoundedIcon from '@material-ui/icons/AnnouncementRounded';

import mainBg from './assets/img/mainBg.webp';
import SortableSectionHeader from './fragments/SortableSectionHeader';
import { useCallback, useEffect, useRef, useState } from 'react';
import ArticleCard from './fragments/ArticleCard';
import SortButtonDropdown from './fragments/SortButtonDropdown';

// Firebase
import firebase from 'firebase/app';

// Images
import UserAccount from './components/UserAccount';
import UploadImgBtn from './fragments/UploadImgBtn';
import EndIsland from './fragments/EndIsland';
import PhotoCard from './fragments/PhotoCard';
import ArticleViewer from './components/ArticleViewer';
import PhotoPostViewer from './components/PhotoPostViewer';
import SideDrawer from './components/SideDrawer';

let db, storageRef, auth;

const useStyles = makeStyles((theme) => createStyles({
    heroBg: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        backgroundImage: `url('${mainBg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: '$entry 1.5s ease-in-out 1.5s forwards',
        transform: 'scale(1.25)',
        filter: 'blur(8px) brightness(0)',
    },
    '@keyframes entry': {
        '60%': {
            filter: 'blur(6px) brightness(1)',
        },
        'to': {
            transform: 'scale(1)',
            filter: 'blur(0)',
        }
    }
}));

const getMoreArticles = async (n, l) => {
    const snap = await db.collection('articles').orderBy('time', 'desc').startAfter(l).limit(n).get();
    const t = [];
    for (const doc of snap.docs) {
        const d = doc.data();
        const img = d.coverURL?.match(/\.com\/.\/(?<f>.*)(\?)/)[1];
        let imgURL;
        try {
            imgURL = img ? await storageRef.child(decodeURIComponent(img)).getDownloadURL() : null
        } catch(e) {
            imgURL = null
        }
        t.push({
            title: d.title ?? 'No article title',
            summary: d.sum ?? 'No article summary',
            body: d.body,
            hideVote: d.hideVote,
            rating: 0,
            imgURL: imgURL,
            time: d.time,
            uid: d.uid,
        });
    }
    return t;
}

export default function App() {
    const classes = useStyles();

    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('sm')),
        smallBtn = useMediaQuery('(max-width:380px)'),
        articleSmallLayout = useMediaQuery('(max-width:800px)');
    const btnSize = smallBtn ? 'small' : (desktop ? 'large' : 'medium');

    const heroRef = useRef(null),
        pictureCarousel = useRef(null),
        [articles, setArticles] = useState(() => []),
        [allLoaded, setAllLoaded] = useState(false),
        [websites, setWebsites] = useState([]),
        [acctOpen, setAcctOpen] = useState(false),
        [user, setUser] = useState(null),
        [photoCardData, setPhotoCardData] = useState([]),
        [article, setArticle] = useState({}),
        [artOpen, setArtOpen] = useState(false),
        [prevPhoto, setPrevPhoto] = useState({src: '', caption: '', title: ''}),
        [photoPrevOpen, setPhotoPrevOpen] = useState(false),
        [drawerOpen, setDrawerOpen] = useState(false);

    const [alertOpen, setAlertOpen] = useState(true);
    const alertStyles = desktop ? {right: 16, top: 16} : {left: 10, top: 10};

    useEffect(() => {
        db = firebase.firestore();
        storageRef = firebase.storage().ref();
        auth = firebase.auth();
        auth.onAuthStateChanged(u => setUser(u));

        const pc = pictureCarousel.current;

        const wheelHandler = e => {
            if (pc.scrollWidth - pc.clientWidth <= pc.scrollLeft + e.deltaY || pc.scrollLeft + e.deltaY <= 0) return;
            pc.scrollBy(e.deltaY, 0);
            e.preventDefault();
        }

        db.collection('configurableElements').doc('links').onSnapshot(snap => {
            setWebsites([]);
            for (const label in snap.data()) {
                setWebsites(v => [...v, {label, href: snap.data()[label]}])
            }
        })

        pc.addEventListener('wheel', wheelHandler);

        return () => {
            pc.removeEventListener('wheel', wheelHandler)
        }
    }, []);

    // Load photos
    useEffect(() => {
        if (!user) return;
        const t = [];
        storageRef.child('userPostImages').listAll().then(res => {
            console.log(res)
            res.items.forEach(async r => {
                const meta = await r.getMetadata();
                const url = await r.getDownloadURL();

                t.push({
                    imgURL: url,
                    title: meta.customMetadata.title,
                    desc: meta.customMetadata.caption,
                    authorName: meta.customMetadata.author,
                    nameID: meta.name
                });
            });
        });
        setPhotoCardData(t);
    }, [user])

    // Helper functions (in a function)
    const loadMoreArticles = useCallback(() => {
        let o = true;
        setArticles(v => {
            if (!o) return v;
            o = false;
            getMoreArticles(5, v[v.length - 1]?.time ?? +new Date()).then(articles => {
                if (articles.length === 0) setAllLoaded(true);
                else setArticles(v => ([...v, ...articles]));
            });
            return v;
        });
    }, []);

    // Load initial articles
    useEffect(() => {
        loadMoreArticles();
    }, [loadMoreArticles]);

    return <>
        {/*<Collapse in={alertOpen} mountOnEnter unmountOnExit orientation='horizontal' style={{ position: 'fixed', zIndex: 6, ...alertStyles}}>*/}
        {/*    <div>*/}
        {/*        <Alert variant='filled' sx={{backgroundColor: '#2e7d3288', border: '1px solid #ffffff45',*/}
        {/*            width: desktop ? 300 : 'calc(100vw - 20px)', backdropFilter: 'blur(6px) saturate(1.5)',*/}
        {/*            'div.MuiAlert-action': {alignItems: 'center', pt: 0}}}*/}
        {/*               icon={<AnnouncementRoundedIcon />}*/}
        {/*               action={*/}
        {/*                   <IconButton*/}
        {/*                       aria-label='close'*/}
        {/*                       color='inherit'*/}
        {/*                       size='small'*/}
        {/*                       onClick={() => {*/}
        {/*                           setAlertOpen(false);*/}
        {/*                       }}*/}
        {/*                   >*/}
        {/*                       <CloseRoundedIcon fontSize='inherit' />*/}
        {/*                   </IconButton>*/}
        {/*               }>*/}
        {/*            <Typography>This is an announcement</Typography>*/}
        {/*        </Alert>*/}
        {/*    </div>*/}
        {/*</Collapse>*/}

        <Fab color='primary' onClick={() => setDrawerOpen(true)}
             sx={{top: 8, right: 8, position: 'fixed', zIndex: 2}}>
            <MenuRoundedIcon />
        </Fab>

        <Box minHeight={desktop ? 'calc(100vh - 125px)' : 'calc(12vh + 125px)'} className={classes.heroBg} />

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
                                    stiffness: 300,
                                    damping: 10,
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
                                startIcon={<DescriptionRoundedIcon />}>Latest news</Button>
                        {/*<Button size={btnSize} variant='contained' sx={{mx: .25}}*/}
                        {/*        startIcon={<GamesRoundedIcon />}>Games</Button>*/}
                        {user && <Button size={btnSize} variant='contained' sx={{ml: .25}} href='#sHash'
                                startIcon={<PhotoRoundedIcon />}>Image posts</Button>}
                    </Box>
                </Box>

                <Typography align='center' variant='body1' py={1}>...or continue exploring below</Typography>
                {
                    desktop && <IconButton sx={{left: '50%', transform: 'translateX(-50%)', mb: 1, p: 0}} href='#sHash'>
                        <motion.span whileHover={{y: [null, 5, 0]}}
                                     transition={{duration: .4}} style={{display: 'flex', padding: 12}}>
                            <ExpandMoreRoundedIcon />
                        </motion.span>
                    </IconButton>
                }
                {user && 
                <SortableSectionHeader header='Photos' mb={1} id='sHash'/>}
                {
                    !desktop && <Typography variant='subtitle2' color='text.secondary' mb={1}>Top 3 images posted this week</Typography>
                }
                {user && 
                <Box display='flex' flexWrap='nowrap' gap={1} ref={pictureCarousel}
                     sx={{overflowX: 'auto', '&::-webkit-scrollbar': {height: 13},
                         '&:hover::-webkit-scrollbar-thumb': {backgroundColor: '#6B6B6BFF'},
                         '&::-webkit-scrollbar-thumb': {backgroundColor: '#313131'},
                     }}>
                    {
                        photoCardData.map(d => <PhotoCard d={d} key={d.name}
                                                          preview={setPrevPhoto} previewOpen={setPhotoPrevOpen} />)
                    }
                </Box>}

                {
                    !desktop && <Button sx={{my: 1.8, width: '100%'}} variant='contained'
                                        startIcon={<PhotoRoundedIcon />}>View More</Button>
                }

                {user && <Divider sx={{my: 1.8, mt: desktop ? 1.8 : 0}}/>}

                <SortableSectionHeader header='Articles' mb={1} />
                {
                    !desktop && <Typography variant='subtitle2' color='text.secondary' mb={1}>Top 3 images posted this week</Typography>
                }

                <Box display='flex' justifyContent='center' alignItems='flex-start'
                     flexDirection={articleSmallLayout ? 'column-reverse' : 'row'}>
                    <Virtuoso
                        style={{width: articleSmallLayout ? '100%' : 640}}
                        useWindowScroll
                        data={articles}
                        endReached={loadMoreArticles}
                        overscan={1000}
                        itemContent={(i, article) => <ArticleCard {...article} setArticle={setArticle} setOpen={setArtOpen} />}
                        components={{
                            Footer: () => <>
                                { !allLoaded && <ArticleCard /> }
                                { allLoaded && <EndIsland /> }
                            </>
                        }}
                    />

                    <Card sx={{width: articleSmallLayout ? '100%' : 312, ml: articleSmallLayout ? 0 : 3,
                        mb: 1.5, position: articleSmallLayout ? 'relative' : 'sticky', top: articleSmallLayout ? 0 : 24}}>
                        <CardContent sx={{pb: '1rem!important'}}>
                            <Typography variant='h6' lineHeight={1}>Articles</Typography>
                            <Divider sx={{py: .25}}>About</Divider>
                            <Typography variant='subtitle2' color='text.secondary'>
                                These are articles hand-crafted by the lovely teachers and students in the NE community
                            </Typography>
                            {
                                !articleSmallLayout && <>
                                    <Divider sx={{py: .25}}>Sort & Filter</Divider>
                                    <SortButtonDropdown fullWidth sx={{my: .5}} />
                                </>
                            }
                            <Divider sx={{py: .25}}>Related Websites</Divider>
                            <Box display='flex' gap={1} flexWrap='wrap' my={.5}>
                                {
                                    websites.map(s => <Chip key={s.href} {...s} clickable component='a' target='_blank' />)
                                }
                            </Box>
                            <Divider sx={{py: .25}}>Credits</Divider>
                            <Typography variant='subtitle2' color='text.secondary'>
                                Another quality product by Vincent Kwok and Wang Zerui in collaboration with the NUSH NE community
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                <Paper elevation={20} sx={{borderRadius: '36px 36px 0 0', p: '18px 18px 16px', m: '0 -18px'}}>
                    <Typography variant='h4'>NUSH NE Stuff</Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Another quality product by Vincent Kwok and Wang Zerui in collaboration with the NUSH NE committee
                    </Typography>
                </Paper>
            </Paper>
        </Box>

        <UserAccount open={acctOpen} setOpen={setAcctOpen} appName='NUSH NE'/>

        {user && <UploadImgBtn />}

        <ArticleViewer article={article} open={artOpen} setOpen={setArtOpen} />

        <PhotoPostViewer open={photoPrevOpen} setOpen={setPhotoPrevOpen} {...prevPhoto} />

        <SideDrawer open={drawerOpen} setOpen={setDrawerOpen} setAcctOpen={setAcctOpen} user={user} />
    </>
}
