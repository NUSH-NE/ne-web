import {
    Avatar,
    Box,
    CardActionArea,
    Divider,
    Drawer,
    Fab,
    Paper,
    Tooltip,
    Typography
} from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';

// Icons
import LoginRoundedIcon from '@material-ui/icons/LoginRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

import { useState } from 'react';
import NewsCard from '../fragments/NewsCard';

export default function SideDrawer({open, setOpen, setAcctOpen, user}) {
    const [value, setValue] = useState(new Date());

    return <Drawer anchor='right' open={open} onClose={() => setOpen(false)}
                   PaperProps={{sx: {backdropFilter: 'blur(12px) brightness(.5) saturate(1.5)', bgcolor: 'transparent'}}}
                   ModalProps={{BackdropProps: {sx: {opacity: '0!important'}}}}>
        <Box width={375} px={2} py={1.5}>
            <Divider sx={{mb: .5}}>You</Divider>
            <Box display='flex' mb={2} alignItems='center'>
                <Avatar src={user?.photoURL} sx={{width: 60, height: 60}} />
                <div>
                    <Typography variant='h6' ml={1.5}>{user ? user.displayName : 'Not signed in'}</Typography>
                    {user && <Typography variant='subtitle2' ml={1.5} color='text.secondary'>{user.email}</Typography> }
                </div>
            </Box>
            <Tooltip title={user ? 'Your account - ' + user.displayName : 'Sign in to your NUSH Microsoft account'}>
                <Fab variant='extended' color='secondary' onClick={() => setAcctOpen(true)} sx={{width: '100%'}}>
                    {user ? 'Account' : 'Login'}
                    {user ? <PersonRoundedIcon sx={{ ml: 1 }} /> : <LoginRoundedIcon sx={{ ml: 1 }} />}
                </Fab>
            </Tooltip>

            <Divider sx={{my: 1}}>Events</Divider>
            <Paper variant='outlined' sx={{bgcolor: 'transparent', backdropFilter: 'brightness(.8)', '&>div': {bgcolor: 'transparent'}}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        openTo='day'
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={params => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Paper>
            {
                ['Creation of the website!']
                    .map(v => <Paper elevation={8} key={v}
                                     sx={{my: 1, bgcolor: 'transparent', backdropFilter: 'brightness(.8)', overflow: 'hidden'}}>
                        <Tooltip title='Click for more info'>
                            <CardActionArea sx={{p: 1.5}}>
                                <Typography variant='body1'>{v} • <b>20 Dec 2021</b></Typography>
                                <Typography variant='subtitle2'>The date when the website was created :P</Typography>
                            </CardActionArea>
                        </Tooltip>
                    </Paper>
                )
            }

            <Divider sx={{my: 1}}>News</Divider>
            {
                [
                    // {title: 'A test', caption: 'A random caption',
                    //     imgURL: 'https://i.picsum.photos/id/299/400/225.webp?hmac=lbJncdLGInyeb6okXUKk6fAfQINTsaa_wAqAVg4-TSg'},
                    // {title: 'Hmm this is a nice picture', caption: 'Idk whats in this photo tho',
                    //     imgURL: 'https://i.picsum.photos/id/547/400/225.webp?hmac=mPn4tjerQ1AR-2CpTeq0U9hwaNBd5-TshhEWvxj16jI'},
                    // {title: 'This is a smaller card', caption: 'XCode is a scam', variant: 'compact',
                    //     imgURL: 'https://developer.apple.com/design/human-interface-guidelines/macos/images/app-icon-realistic-materials.png'},
                    // {title: 'The smallest card', variant: 'dense',
                    //     caption: 'This is a dense card, suitable for smaller events to put less emphasis on them'},
                    {title: 'No news for now', caption: 'Check back in some time! :D', variant: 'dense'}
                ].map(k => <NewsCard {...k} key={k.title + k.caption} />)
            }
        </Box>
    </Drawer>
}
