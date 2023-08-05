import { memo, useState } from 'react';
import { Button, Paper, Typography, Collapse, SvgIcon } from '@material-ui/core';

export default memo(function CookieConsent() {
    const [open, setOpen] = useState(!localStorage.ateCookies);

    return <Collapse in={open} sx={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
        <Paper sx={{display: 'flex', alignItems: 'center', p: 1.25, borderRadius: '12px 12px 0 0'}}>
            <SvgIcon viewBox='0 0 512 512' sx={{mr: 1.5, ml: .75}}>
                <path fill="currentColor"
    d="M352 320c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32zM192 192c0-17.67-14.33-32-32-32s-32 14.33-32 32 14.33 32 32 32 32-14.33 32-32zm0 128c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32zm96-96c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32zm222.52 31.82c-69.97-.85-126.47-57.69-126.47-127.86-70.17 0-127-56.49-127.86-126.45C249.57.5 242.9 0 236.26 0c-20.68 0-41.18 4.85-59.79 14.33l-69.13 35.22a132.221 132.221 0 0 0-57.79 57.81l-35.1 68.88a132.645 132.645 0 0 0-12.82 80.95l12.08 76.28a132.555 132.555 0 0 0 37.16 72.96l54.77 54.76a132.036 132.036 0 0 0 72.71 37.06l76.71 12.14c6.86 1.09 13.76 1.62 20.64 1.62 20.72 0 41.25-4.88 59.89-14.38l69.13-35.22a132.221 132.221 0 0 0 57.79-57.81l35.1-68.88c12.56-24.63 17.01-52.57 12.91-79.9zm-55.68 58.1l-35.1 68.88c-8.14 15.97-20.87 28.7-36.81 36.83l-69.13 35.22c-11.74 5.98-24.92 9.15-38.1 9.15-4.38 0-8.8-.35-13.13-1.03l-76.71-12.14c-17.64-2.79-33.64-10.95-46.28-23.59l-54.77-54.76c-12.69-12.69-20.88-28.77-23.69-46.52l-12.08-76.27c-2.81-17.77.01-35.62 8.18-51.64l35.1-68.88c8.14-15.97 20.87-28.71 36.81-36.83l69.13-35.22c5.52-2.81 11.36-5 17.38-6.52 17.83 58.88 65.85 104.96 125.69 120.09 15.12 59.85 61.22 107.87 120.11 125.69a83.485 83.485 0 0 1-6.6 17.54z"/>
            </SvgIcon>
            <Typography flexGrow={1}>We use tasty cookies for login and traffic analysis purposes.</Typography>
            <Button variant='contained' size='large' onClick={() => {
                setOpen(false);
                localStorage.ateCookies = true;
            }}>No problem!</Button>
        </Paper>
    </Collapse>
});