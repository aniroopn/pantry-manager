import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { firestore } from '../firebase';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const PantryManager = () => {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const updateInventory = async () => {
      if (user) {
        const snapshot = await getDocs(collection(firestore, 'users', user.uid, 'inventory'));
        const inventoryList = [];
        snapshot.forEach((doc) => {
          inventoryList.push({ id: doc.id, ...doc.data() });
        });
        setInventory(inventoryList);
      }
    };
    updateInventory();
  }, [user]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addItem = async () => {
    if (user) {
      const docRef = doc(collection(firestore, 'users', user.uid, 'inventory'), itemName);
      await setDoc(docRef, { quantity });
      handleClose();
      setItemName('');
      setQuantity(1);
      // Trigger re-fetch of inventory
      const snapshot = await getDocs(collection(firestore, 'users', user.uid, 'inventory'));
      const inventoryList = [];
      snapshot.forEach((doc) => {
        inventoryList.push({ id: doc.id, ...doc.data() });
      });
      setInventory(inventoryList);
    }
  };

  const removeItem = async (id) => {
    if (user) {
      await deleteDoc(doc(firestore, 'users', user.uid, 'inventory', id));
      // Trigger re-fetch of inventory
      const snapshot = await getDocs(collection(firestore, 'users', user.uid, 'inventory'));
      const inventoryList = [];
      snapshot.forEach((doc) => {
        inventoryList.push({ id: doc.id, ...doc.data() });
      });
      setInventory(inventoryList);
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="linear-gradient(to right, #ff7e5f, #feb47b)"
      p={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, bgcolor: '#ffffff', width: '300px', margin: 'auto', mt: '20vh', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h6" color="#333333" mb={2}>Add Item</Typography>
          <Stack spacing={2}>
            <TextField
              label="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={addItem}
              fullWidth
              sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#45a049' } }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <TextField
        label="Search Items"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, borderColor: '#4caf50', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#4caf50' } } }}
      />
      <Button
        variant="contained"
        onClick={handleOpen}
        fullWidth
        sx={{ backgroundColor: '#2196f3', '&:hover': { backgroundColor: '#1976d2' } }}
      >
        Add New Item
      </Button>
      <Box border="1px solid #333" width="800px" borderRadius="8px" overflow="hidden">
        <Box bgcolor="#4caf50" padding={2} display="flex" justifyContent="center" color="#ffffff">
          <Typography variant="h4">Inventory Items</Typography>
        </Box>
        <Stack spacing={2} overflow="auto" maxHeight="400px" padding={2}>
          {filteredInventory.map(({ id, quantity }) => (
            <Box
              key={id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#ffffff"
              padding={2}
              borderRadius="8px"
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
            >
              <Typography sx={{ flexGrow: 1, textAlign: 'left', color: '#333333' }}>{id}</Typography>
              <Typography sx={{ width: 100, textAlign: 'center', color: '#333333' }}>Quantity: {quantity}</Typography>
              <Button
                variant="contained"
                onClick={() => removeItem(id)}
                sx={{ backgroundColor: '#f44336', '&:hover': { backgroundColor: '#d32f2f' } }}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default PantryManager;