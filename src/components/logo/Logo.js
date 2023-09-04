import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 84,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >

      {
        <svg viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
          <g id="SVGRepo_iconCarrier">
            <path d="M192 96c-17.6 0-32 14.4-32 32v768c0 17.6 14.4 32 32 32h640c17.6 0 32-14.4 32-32V128c0-17.6-14.4-32-32-32H192z m0-32h640c35.2 0 64 28.8 64 64v768c0 35.2-28.8 64-64 64H192c-35.2 0-64-28.8-64-64V128c0-35.2 28.8-64 64-64z" fill="#050D42" />
            <path d="M576 512m-160 0a160 160 0 1 0 320 0 160 160 0 1 0-320 0Z" fill="#2F4BFF" />
            <path d="M475.2 390.4c-4.8-48-22.4-86.4-57.6-123.2-6.4-6.4-6.4-16 0-22.4 6.4-6.4 16-6.4 22.4 0 43.2 43.2 62.4 89.6 67.2 145.6 57.6 3.2 94.4 16 126.4 48 30.4 30.4 43.2 65.6 46.4 116.8 49.6 3.2 92.8 22.4 134.4 62.4 6.4 6.4 6.4 16 0 22.4-6.4 6.4-16 6.4-22.4 0-33.6-33.6-68.8-49.6-110.4-52.8 0 9.6 0 19.2-1.6 28.8 0 3.2-3.2 43.2-3.2 52.8-1.6 17.6 0 32 1.6 43.2 1.6 14.4 6.4 24 12.8 30.4 6.4 6.4 6.4 16 0 22.4-6.4 6.4-16 6.4-22.4 0-11.2-11.2-19.2-28.8-20.8-49.6-1.6-14.4-1.6-28.8-1.6-49.6 0-11.2 3.2-49.6 3.2-52.8 0-9.6 1.6-17.6 1.6-27.2-8 0-16 1.6-24 1.6-9.6 1.6-67.2 11.2-81.6 12.8-24 1.6-41.6-3.2-56-16-9.6-9.6-14.4-22.4-16-38.4-1.6-12.8-1.6-27.2 1.6-49.6 0-4.8 3.2-25.6 3.2-27.2 1.6-11.2 1.6-20.8 1.6-28.8v-20.8h-22.4c-1.6 0-28.8 0-36.8 1.6H384c-40-1.6-68.8-11.2-88-30.4-6.4-6.4-6.4-16 0-22.4 6.4-6.4 16-6.4 22.4 0 12.8 12.8 33.6 19.2 67.2 20.8h33.6c8 0 35.2-1.6 36.8-1.6 4.8 3.2 12.8 3.2 19.2 3.2z m171.2 164.8c-3.2-41.6-12.8-70.4-36.8-94.4-24-24-54.4-35.2-102.4-38.4v22.4c0-8-8 83.2-6.4 99.2 1.6 9.6 3.2 14.4 8 19.2 4.8 4.8 14.4 8 30.4 6.4 12.8-1.6 68.8-11.2 80-11.2 9.6-1.6 19.2-3.2 27.2-3.2zM224 184c-9.6 0-16-6.4-16-16s6.4-16 16-16h192c9.6 0 16 6.4 16 16s-6.4 16-16 16H224zM216 736c-4.8 0-8-3.2-8-8s3.2-8 8-8h128c4.8 0 8 3.2 8 8s-3.2 8-8 8h-128z m0 48c-4.8 0-8-3.2-8-8s3.2-8 8-8h128c4.8 0 8 3.2 8 8s-3.2 8-8 8h-128z m0 48c-4.8 0-8-3.2-8-8s3.2-8 8-8h128c4.8 0 8 3.2 8 8s-3.2 8-8 8h-128z" fill="#050D42" />
            <path d="M776 128c22.4 0 40 17.6 40 40S798.4 208 776 208 736 190.4 736 168 753.6 128 776 128z" fill="#2F4BFF" />
          </g>
        </svg>
      }
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
