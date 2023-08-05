import { Button, Menu, MenuItem } from '@material-ui/core';
import { memo, useState } from 'react';

// Icons
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

export default memo(function SortButtonDropdown(p) {
    const [anchor, setAnchor] = useState(null),
        [curSort, setCurSort] = useState(0),
        open = Boolean(anchor);

    const sortOps = ['Popular', 'Date (Newest)', 'Date (Oldest)'];

    const mID = 'bID-' + Math.floor(Math.random() * 10000).toString() + '-sb',
        bID = 'mID-' + Math.floor(Math.random() * 10000).toString() + '-sb';

    const cm = () => setAnchor(null);

    return <>
        <Button endIcon={<ExpandMoreRoundedIcon />} variant='outlined'
                id={bID}
                {...p}
                aria-controls={mID}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={e => setAnchor(e.currentTarget)}>Sort - {sortOps[curSort]}</Button>
        <Menu
            id={mID}
            aria-labelledby={bID}
            anchorEl={anchor}
            open={open}
            onClose={cm}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}>
            {
                sortOps.map((o, i) => <MenuItem onClick={() => {setCurSort(i); cm();}} key={o}>{o}</MenuItem>)
            }
        </Menu>
    </>
});