import {
    Fab,
    Zoom,
    useScrollTrigger,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
    Typography,
    Paper,
    Backdrop,
    CircularProgress
} from '@material-ui/core';

import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import { v4 as uuidv4 } from 'uuid';

import { useEffect, useRef, useState } from 'react';

import firebase from 'firebase/app';

const allowedImageTypes = [
    'jpeg',
    'webp',
    'png'
].map(v => 'image/' + v);

let storageRef;

export default function UploadImgBtn() {
    const f = useRef(),
        [prevFile, setPrevFile] = useState(null),
        prevOpen = Boolean(prevFile),
        [imgCap, setImgCap] = useState(''),
        [title, setTitle] = useState(''),
        [backdropOpen, setBackdropOpen] = useState(false);

    useEffect(() => {
        storageRef = firebase.storage().ref();
    }, []);

    const trigger = useScrollTrigger({
        disableHysteresis: true
    });

    const handleFileChange = e => {
        const f = e.currentTarget.files[0];
        if (!allowedImageTypes.includes(f.type) || f.size > 1024 * 1000 * 20) return;

        setPrevFile(f);
        // console.log(e.currentTarget.files);
    }

    const uploadImg = () => {
        const t = storageRef.child('userPostImages/' + uuidv4()).put(prevFile, {
            customMetadata: {
                'title': title,
                'caption': imgCap,
                'author': firebase.auth().currentUser.displayName,
                'uid': firebase.auth().currentUser.uid
            }
        });

        setBackdropOpen(true);
        t.on('state_changed',
            snapshot => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error(error)
                setBackdropOpen(false);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                t.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
                setBackdropOpen(false);
                setPrevFile(null);
            }
        );
    }

    return <>
        <Zoom in={trigger}>
            <Box sx={{position: 'fixed', left: '50%', bottom: 42, zIndex: 12, marginLeft: '-85px'}}>
                <Fab variant='extended' size='medium' color='primary' aria-label='add' onClick={() => {
                    f.current.value = '';
                    f.current.click();
                }}>
                    <PublishRoundedIcon sx={{ mr: 1 }} />
                    Post an image
                </Fab>
            </Box>
        </Zoom>

        <Dialog open={prevOpen} maxWidth='xs' fullWidth PaperProps={{sx: {position: 'relative', overflow: 'visible'}}}>
            <Paper elevation={12} sx={{position: 'absolute', top: -70, left: 24, display: 'flex', overflow: 'hidden'}}>
                <img src={prevFile && URL.createObjectURL(prevFile)} style={{height: 140, width: 'auto'}}
                     onLoad={e => URL.revokeObjectURL(e.currentTarget.src)} alt={imgCap} />
            </Paper>

            <DialogTitle sx={{pt: 10.5, pb: 1}}>Post an Image</DialogTitle>
            <DialogContent sx={{pb: .5}}>
                <TextField variant='filled' label='Title' fullWidth size='small' sx={{mb: 1}}
                           onChange={e => setTitle(e.currentTarget.value)} value={title} />
                <TextField variant='filled' label='Caption' fullWidth multiline maxRows={4} size='small'
                           onChange={e => setImgCap(e.currentTarget.value)} value={imgCap} />
                <Typography variant='subtitle2' mt={.5} color='text.secondary'>Add a short caption that describes your image post</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setPrevFile(null)}>Cancel</Button>
                <Box flexGrow={1} />
                <Button variant='contained' color='success' endIcon={<SendRoundedIcon />} onClick={uploadImg}>Post</Button>
            </DialogActions>
        </Dialog>

        <Backdrop
            sx={{ zIndex: t => t.zIndex.modal + 100, flexDirection: 'column' }}
            open={backdropOpen} component='div'>
            <CircularProgress />
            <Typography mt={1}>Uploading image...</Typography>
        </Backdrop>

        <input type='file' aria-label='' ref={f} style={{display: 'none'}} onChange={handleFileChange} />
    </>
}
