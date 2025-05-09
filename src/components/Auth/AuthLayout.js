import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, linkText, linkPath }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {children}
        <Box mt={3}>
          <Link to={linkPath} variant="body2">
            {linkText}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthLayout;