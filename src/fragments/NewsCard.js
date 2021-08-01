import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';

export default function NewsCard({title, caption, imgURL, variant = 'big'}) {
    const big = variant === 'big';
    const compact = variant === 'compact';
    const dense = variant === 'dense';

    return <Card variant='outlined' sx={{bgcolor: 'transparent', backdropFilter: 'brightness(.8)', mb: 1}}>
        <CardActionArea sx={{display: compact ? 'flex' : 'block'}}>
            {
                big && <>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={imgURL}
                        title={title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>{title}</Typography>
                        <Typography variant='body2' color='text.secondary'>{caption}</Typography>
                    </CardContent>
                </>
            }
            {
                compact && <>
                    <CardContent sx={{flex: 1}}>
                        <Typography gutterBottom variant='h5' component='div'>{title}</Typography>
                        <Typography variant='body2' color='text.secondary'>{caption}</Typography>
                    </CardContent>
                    <CardMedia
                        sx={{ width: 124, alignSelf: 'stretch' }}
                        image={imgURL}
                        title={title}
                    />
                </>
            }
            {
                dense && <CardContent sx={{py: 1.2}}>
                    <Typography variant='h6' component='div'>{title}</Typography>
                    <Typography variant='caption' color='text.secondary'>{caption}</Typography>
                </CardContent>
            }
        </CardActionArea>
    </Card>
}
