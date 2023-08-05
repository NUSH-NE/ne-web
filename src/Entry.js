// Entry Point

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import App from './App';
import themeOptions from './lib/themeOptions';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

// Import firebase stuff
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/app-check';

// Fonts
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/700.css';
import '@fontsource/poppins/600.css';
import '@fontsource/roboto-slab/400.css';
import '@fontsource/roboto-slab/700.css';
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

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
            <Switch>
                <Route path='/'><App /></Route>
            </Switch>
        </Router>

        { /* Cookie Banner */ }
        <CookieConsent />
    </ThemeProvider>
}
