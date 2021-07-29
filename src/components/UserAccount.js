import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    SvgIcon,
    Avatar,
    Typography
} from '@material-ui/core';
import { ReactComponent as microsoft } from '../icon/microsoft.svg';

import firebase from 'firebase/app';

let auth;

export default function UserAccount({appName, open, setOpen}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth = firebase.auth();
        auth.onAuthStateChanged(u => setUser(u));
    }, []);

    const microsoftSignIn = () => {
        auth.signInWithPopup(new firebase.auth.OAuthProvider('microsoft.com'))
            .then()
            .catch(e => console.error('Failed to sign in with Google: ' + e.message));
    }

    return <Dialog open={open} maxWidth='xs' fullWidth onClose={() => setOpen(false)}>
        {
            !user &&
            <>
                <DialogTitle>Sign in to {appName}</DialogTitle>
                <DialogContent sx={{pb: 1}}>
                    <Button variant='contained' sx={{bgcolor: '#2f2f2f', mt: 1}} fullWidth onClick={microsoftSignIn}
                            startIcon={<SvgIcon component={microsoft} viewBox='0 0 21 21' />}>Sign in with Microsoft</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Box flexGrow={1} />
                </DialogActions>
            </>
        }
        {
            user && <>
                <DialogTitle>Manage Account</DialogTitle>
                <DialogContent sx={{pb: 1}}>
                    <Avatar src={user.photoURL ?? ''} sx={{width: 150, height: 150, mb: 1, mx: 'auto'}} />
                    <Typography>Name: {user.displayName ?? 'Unknown'}</Typography>
                    <Typography>Email: {user.email ?? 'Unknown'}</Typography>
                    <Typography variant='caption' align='center'>This information is private and only visible to you</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='warning' onClick={() => auth.signOut()}>Sign out</Button>
                    <Box flexGrow={1} />
                    <Button variant='contained' onClick={() => setOpen(false)}>Done</Button>
                </DialogActions>
            </>
        }
    </Dialog>
}

/*export default function UserAccount() {
    return <></>
}*/
