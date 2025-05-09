import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton,
  Typography,
  Paper,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  deleteDoc, 
  doc 
} from '../firebase';

const ShoppingList = ({ user }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (user) {
      const fetchItems = async () => {
        const q = query(
          collection(db, 'shoppingItems'), 
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const itemsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(itemsData);
      };
      fetchItems();
    } else {
      setItems([]);
    }
  }, [user]);

  const addItem = async () => {
    if (newItem.trim() === '') return;
    
    try {
      const docRef = await addDoc(collection(db, 'shoppingItems'), {
        name: newItem,
        userId: user.uid,
        createdAt: new Date()
      });
      setItems([...items, { id: docRef.id, name: newItem }]);
      setNewItem('');
    } catch (err) {
      console.error('Error adding item: ', err);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'shoppingItems', itemId));
      setItems(items.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Error deleting item: ', err);
    }
  };

  const deleteAllItems = async () => {
    try {
      const q = query(
        collection(db, 'shoppingItems'), 
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, 'shoppingItems', document.id));
      });
      
      setItems([]);
    } catch (err) {
      console.error('Error deleting all items: ', err);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Shopping List
      </Typography>
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={addItem}
          style={{ marginLeft: '10px' }}
        >
          Add
        </Button>
      </div>
      
      {items.length > 0 && (
        <>
          <Divider style={{ margin: '20px 0' }} />
          <List>
            {items.map((item) => (
              <ListItem key={item.id}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={() => deleteItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            variant="outlined"
            color="error"
            onClick={deleteAllItems}
            style={{ marginTop: '20px' }}
            fullWidth
          >
            Clear All Items
          </Button>
        </>
      )}
      
      {items.length === 0 && (
        <Typography variant="body1" style={{ textAlign: 'center', margin: '20px 0' }}>
          {user ? 'Your shopping list is empty' : 'Please sign in to manage your shopping list'}
        </Typography>
      )}
    </Paper>
  );
};

export default ShoppingList;