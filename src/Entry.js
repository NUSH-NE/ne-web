// Entry Point

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import App from './App';
import themeOptions from './lib/themeOptions';
import { Typography, Alert, IconButton, Collapse, CssBaseline, ThemeProvider } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Import firebase stuff
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/app-check';

// Icons
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import AnnouncementRoundedIcon from '@material-ui/icons/AnnouncementRounded';

// Fonts
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/700.css';
import '@fontsource/poppins/600.css';
import { useState } from 'react';
import CookieConsent from './fragments/CookieConsent';

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyDkJIx8hbU_5-8aPBzfsKi1vHwQliKG5hg',
    authDomain: 'ne-edu.firebaseapp.com',
    projectId: 'ne-edu',
    storageBucket: 'ne-edu.appspot.com',
    messagingSenderId: '296273538078',
    appId: '1:296273538078:web:dda01455949345d57b520f',
    measurementId: 'G-0XJHB0Z6JV'
};

firebase.initializeApp(firebaseConfig);

firebase.appCheck().activate('6LedN1kbAAAAAFFSX5v4tpkG2xY0lVRSkm9fP90f');

export default function Entry() {
    const theme = themeOptions('dark');

    const desktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [alertOpen, setAlertOpen] = useState(true);
    const alertStyles = desktop ? {right: 16, top: 16} : {left: 10, top: 10};

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <Collapse in={alertOpen} mountOnEnter unmountOnExit orientation='horizontal' style={{ position: 'fixed', zIndex: 6, ...alertStyles}}>
            <div>
                <Alert variant='filled' sx={{backgroundColor: '#2e7d3288', border: '1px solid #ffffff45',
                    width: desktop ? 300 : 'calc(100vw - 20px)', backdropFilter: 'blur(6px) saturate(1.5)',
                    'div.MuiAlert-action': {alignItems: 'center', pt: 0}}}
                       icon={<AnnouncementRoundedIcon />}
                       action={
                           <IconButton
                               aria-label='close'
                               color='inherit'
                               size='small'
                               onClick={() => {
                                   setAlertOpen(false);
                               }}
                           >
                               <CloseRoundedIcon fontSize='inherit' />
                           </IconButton>
                       }>
                    <Typography>This is an announcement</Typography>
                </Alert>
            </div>
        </Collapse>
        <Router>
            <Switch>
                <Route path='/'><App /></Route>
            </Switch>
        </Router>

        { /* Cookie Banner */ }
        <CookieConsent />
    </ThemeProvider>
}
