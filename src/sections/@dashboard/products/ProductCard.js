import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RLink } from 'react-router-dom';

// @mui
import { Box, Card, Link, Typography, Stack, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    await navigator.clipboard.writeText(text);
  }
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  return Promise.resolve();
}

const CodeClassShareInfo = ({ codeClass, open, handleClose }) => {
  const [setCodeClassInfo] = useState(codeClass);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyText = () => {
    copyTextToClipboard(codeClass)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}
    >
      <DialogTitle>Compartir Clase</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Comparte el código de la clase con tus estudiantes
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-arround"
          alignItems="center"
        >
          <Grid>
            <TextField
              id='codeClassInfoClipBoard'
              autoFocus
              margin="dense"
              label="Código de la Clase"
              fullWidth
              value={codeClass}
              onChange={(e) => setCodeClassInfo(e.target.value)}
              disabled
            />
          </Grid>
          <Grid
            width={3}
          />
          <Grid>
            <IconButton
              onClick={() => handleCopyText()}
            >
              <Iconify icon="eva:copy-outline" width={20} height={20} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ShopProductCard({ product }) {
  const [codeClassInfo, setCodeClassInfo] = useState('');
  const { name, cover, id, completedHours, description, codeClass } = product;
  const [openShare, setOpenShare] = useState(false);

  // show dialog for share class
  const handleShare = () => {
    setOpenShare(true);
    setCodeClassInfo(codeClass);
  };

  const handleClose = () => {
    setOpenShare(false);
    setCodeClassInfo('');
  }

  return (
    <>
      <CodeClassShareInfo codeClass={codeClass}
        open={openShare}
        handleClose={handleClose} />
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <StyledProductImg alt={name} src={cover} />
          {
            codeClass ? 
            <IconButton
            onClick={handleShare}
            sx={{
              top: 8,
              right: 8,
              position: 'absolute',
              backgroundColor: 'background.default',
            }}
          >
            <Iconify icon="simple-line-icons:share" width={20} height={20} />
          </IconButton> : <></>
          }
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover"
            component={RLink}
            to={`/dashboard/products/detail/${id}`}
          >
            <Typography
              variant="subtitle2"
              noWrap>
              {name}
            </Typography>
          </Link>

          {/* description */}
          <Typography variant="body2" noWrap>
            {description}
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">
              {completedHours} Horas Completadas
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
