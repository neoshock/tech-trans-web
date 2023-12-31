import
React,
{
  useState,
  useEffect
} from 'react';
import { Helmet } from 'react-helmet-async';

import { Link } from 'react-router-dom';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import fetchAndPreparePost from '../_mock/blog';
// ----------------------------------------------------------------------
import { getRole } from '../_mock/auth_service';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {

  const [POSTS, setPOSTS] = useState([]); // Estado para los posts

  const userRole = getRole();  // Obtener el rol del usuario

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await fetchAndPreparePost();
      setPOSTS(fetchedPosts);
    };
    fetchData();
  }, []);


  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | List </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Temas | Blogs
          </Typography>
          {
            userRole === 'teacher' && (
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                component={Link}
                to="/dashboard/blog/create"
              >
                Nuevo Post
              </Button>
            )
          }
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
        </Stack>

        <Grid container spacing={3}>
          {/* Posts */}
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
          {POSTS.length === 0 ?
            <Typography p={3} variant="h5" sx={{ mb: 5 }}>
              No tienes posts registrados
            </Typography>
            : <></>}
        </Grid>
      </Container>
    </>
  );
}
