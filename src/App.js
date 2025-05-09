import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import Auth from './components/Auth';
import ShoppingList from './components/shoppingList';
import { Container, CssBaseline, Box } from '@mui/material';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box sx={{ mt: 4, mb: 4 }}>
        <Auth user={user} />
        {user && <ShoppingList user={user} />}
      </Box>
    </Container>
  );
}

export default App;