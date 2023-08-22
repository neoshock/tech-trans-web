import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Avatar, Grid, styled, alpha } from '@mui/material';
import SvgColor from '../components/svg-color';
import POSTS from '../_mock/blog';


const StyleCardCover = styled('div')({
    position: 'relative',
    paddingTop: 'calc(100% * 1 / 4)',
});


export default function BlogDetailPage() {

    const { blogId } = useParams();
    const { title, content, author, createdAt, background } = POSTS[blogId];

    console.log(background);


    return (
        <>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} md={12}>
                    <Card>
                        <StyleCardCover
                            sx={{
                                pt: 'calc(100% * 1 / 3)',
                                backgroundImage: `url(${background})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'relative',
                                '&:after': {
                                    top: 0,
                                    content: "''",
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                            
                                },
                            }}
                        >
                            <SvgColor
                                color="paper"
                                src="/assets/icons/shape-avatar.svg"
                                sx={{
                                    width: 80,
                                    height: 36,
                                    zIndex: 9,
                                    bottom: -15,
                                    position: 'absolute',
                                    color: 'background.paper',
                                }}
                            />

                            <Avatar
                                alt={author.name}
                                src={author.avatarUrl}
                                sx={{
                                    zIndex: 9,
                                    top: 24,
                                    left: 24,
                                    width: 40,
                                    height: 40,
                                    position: 'absolute',
                                }}
                            />

                            <Box sx={{ position: 'absolute', bottom: 16, left: 16 }}>
                                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                    Publicado el {createdAt.toLocaleDateString()}
                                </Typography>

                                <Typography variant="h4" gutterBottom color={'white'}>
                                    {title}
                                </Typography>
                            </Box>

                        </StyleCardCover>

                        <CardContent>

                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
