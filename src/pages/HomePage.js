import React from 'react';
import { Button, Container } from '@mui/material';
import ShoppingList from '../components/shoppingList';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <Container maxWidth="md">
      <Button 
        variant="contained" 
        color="error" 
        onClick={handleLogout}
        sx={{ mt: 3 }}
      >
        Logout
      </Button>
      <ShoppingList />
    </Container>
  );
};

export default HomePage;