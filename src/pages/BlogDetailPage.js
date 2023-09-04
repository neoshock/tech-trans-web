import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid, styled, Modal } from '@mui/material';

import SvgColor from '../components/svg-color';
import { getBlogDetail } from '../_mock/blog';
import FloatingButton from '../components/buttons/float_button';
import ChatComponent from '../components/chat/chat_component';
import { fDate } from '../utils/formatTime';

const StyleCardCover = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 1 / 4)',
});

export default function BlogDetailPage() {
  const { blogId } = useParams();
  const [blogDetail, setBlogDetail] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchBlogDetail() {
      try {
        const data = await getBlogDetail(blogId);
        console.log(data);
        setBlogDetail(data);
      } catch (error) {
        console.error("Could not fetch blog detail:", error);
      }
    }

    fetchBlogDetail();
  }, [blogId]);

  const { title, content, author, createdAt, background } = blogDetail;

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        BackdropProps={{
          style: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <div
          style={{
            position: 'fixed',
            width: '45%',
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow:
              '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
            padding: '16px 32px 24px',
            top: '15%',
            left: '50%',
            maxHeight: '75vh', // Ajusta la altura máxima vertical como desees
          }}
        >
          <ChatComponent storedContent={content} contentTitle={title} />
        </div>
      </Modal>
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


              <Box sx={{ position: 'absolute', bottom: 16, left: 16 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Publicado el {fDate(createdAt)}
                </Typography>

                <Typography variant="h4" gutterBottom color={'white'}>
                  {title}
                </Typography>
              </Box>
            </StyleCardCover>

            <CardContent>
              <FloatingButton onClick={() => setOpen(true)} />
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
