import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import App from './App';
import themeOptions from './lib/themeOptions';
import { Typography, Alert, IconButton, Slide, CssBaseline, ThemeProvider  } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Icons
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import AnnouncementRoundedIcon from '@material-ui/icons/AnnouncementRounded';

// Fonts
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/700.css';
import '@fontsource/poppins/600.css';
import { useState } from 'react';

export default function Entry() {
    const theme = themeOptions('dark');

    const desktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [alertOpen, setAlertOpen] = useState(true);
    const alertStyles = desktop ? {right: 16, top: 16} : {left: 10, top: 10, width: 'calc(100% - 20px)'};

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <Slide in={alertOpen} mountOnEnter unmountOnExit direction='left' style={{position: 'static'}}>
            <div>
                <Alert variant='filled' sx={{backgroundColor: '#2e7d3288', position: 'fixed', zIndex: 6,
                    border: '1px solid #ffffff45', backdropFilter: 'blur(6px) saturate(1.5)', ...alertStyles,
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
        </Slide>
        <Router>
            <Switch>
                <Route path='/'><App /></Route>
            </Switch>
        </Router>
    </ThemeProvider>
}