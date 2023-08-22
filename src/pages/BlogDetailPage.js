import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import POSTS from '../_mock/blog';

export default function BlogDetailPage() {

    const { blogId } = useParams();
    const { title, content, author, createdAt } = POSTS[blogId];


    return (
        <>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <Avatar alt={author.name} src={author.avatarUrl} sx={{ mr: 2 }} />
                                <Typography variant="h6">{author.name}</Typography>
                            </Box>

                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                Publicado el {createdAt.toLocaleDateString()}
                            </Typography>

                            <Typography variant="h4" gutterBottom>
                                {title}
                            </Typography>

                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
