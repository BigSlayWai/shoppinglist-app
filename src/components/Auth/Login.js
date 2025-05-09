import React, { useState } from 'react';
import { Button, TextField, Grid, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithGoogle, logInWithEmail } from '../../firebase';
import AuthLayout from './AuthLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logInWithEmail(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthLayout 
      title="Sign In" 
      linkText="Don't have an account? Sign Up" 
      linkPath="/signup"
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={signInWithGoogle}
          sx={{ mb: 2 }}
        >
          Sign In with Google
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default Login;