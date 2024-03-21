import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUpdateUserMutation } from '../apiSlice'; // Import the useUpdateUserMutation hook
import { TextField, Button } from '@mui/material';
import MessageBox from './MessageBox';

const EditUserForm = ({ user, onClose }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [messageBox, setMessageBox] = useState({ open: false, message: '' });
  const dispatch = useDispatch();
  const [updateUserMutation] = useUpdateUserMutation(); // Destructure the updateUserMutation function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserMutation({ id: user.id, updatedUser: { name, email } }); // Call the updateUserMutation with the updated user data
      setMessageBox({ open: true, message: 'User updated successfully' });
      setTimeout(() => {
        setMessageBox({ open: false, message: '' });
      }, 5000);
    } catch (error) {
      console.error('Error updating user:', error);
      setMessageBox({ open: true, message: `Error updating user: ${error.message}` });
    } finally {
      onClose();
    }
  };

  if (!user) {
    return <div>User not found</div>;
  }

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
        <Button variant="contained" color="primary" type="submit">
          Update
        </Button>
      </form>
      {messageBox.open && <MessageBox message={messageBox.message} />}
    </div>
  );
};

export default EditUserForm;
