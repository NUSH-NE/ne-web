import { Typography, Box, Button } from '@material-ui/core';

// Icons
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

export default function SortableSectionHeader(p) {
    const {header, ...others} = p;
    return <Box display='flex' {...others}>
        <Typography variant='h6'>{header}</Typography>
        <Box flexGrow={1} />
        <Button endIcon={<ExpandMoreRoundedIcon />} variant='outlined'>Sort</Button>
    </Box>
}