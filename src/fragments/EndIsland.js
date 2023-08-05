import { memo } from 'react';
import endReached from '../assets/endReached.webp';
import { Typography } from '@material-ui/core';
import { motion } from 'framer-motion';

function EndIsland() {
    return <div>
        <Typography align='center' variant='h5' color='text.secondary' mt={1}>
            Looks like you've reached the end!
        </Typography>
        <motion.img src={endReached} animate={{y: [8, -8]}} style={{padding: '.5rem', width: '100%'}}
                    transition={{duration: 4, repeat: Infinity, repeatType: 'reverse'}} draggable={false} />
    </div>
}

export default memo(EndIsland);
