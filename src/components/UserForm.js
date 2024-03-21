import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import MessageBox from './MessageBox';
import { useAddUserMutation, useUpdateUserMutation } from '../apiSlice';

const UserForm = ({ user, onClose, onAddOrUpdateUser }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [messageBox, setMessageBox] = useState({ open: false, message: '' });

  const [addUserMutation] = useAddUserMutation();
  const [updateUserMutation] = useUpdateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email };

    try {
      if (user) {
        await updateUserMutation({ id: user.id, updatedUser: userData });
      } else {
        await addUserMutation(userData);
      }
      setMessageBox({ open: true, message: user ? 'User updated successfully' : 'User added successfully' });
      onAddOrUpdateUser(userData);
      onClose();
    } catch (error) {
      console.error('Error:', error);
      setMessageBox({ open: true, message: `Error: ${error.message}` });
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Button variant="contained" color="primary" type="submit">
            {user ? 'Update' : 'Add'}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose} style={{ marginLeft: '10px' }}>
            Close
          </Button>
        </Box>
      </form>
      {messageBox.open && <MessageBox message={messageBox.message} />}
    </div>
  );
};

export default UserForm;
