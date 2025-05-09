import React from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithGoogle, logout } from '../firebase';

const Auth = ({ user }) => {
  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      {user ? (
        <Button 
          variant="contained" 
          color="error" 
          onClick={logout}
        >
          Logout
        </Button>
      ) : (
        <Button 
          variant="contained" 
          startIcon={<GoogleIcon />}
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      )}
    </div>
  );
};

export default Auth;