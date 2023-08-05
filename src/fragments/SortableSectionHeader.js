import { Typography, Box } from '@material-ui/core';
import { memo } from 'react';

import SortButtonDropdown from './SortButtonDropdown';

export default memo(function SortableSectionHeader(p) {
    const {header, ...others} = p;
    return <Box display='flex' {...others}>
        <Typography variant='h6'>{header}</Typography>
        <Box flexGrow={1} />
        {/*<SortButtonDropdown />*/}
    </Box>
})