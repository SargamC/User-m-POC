import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../usersSlice';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EditUserForm = ({ user, onClose }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const dispatch = useDispatch(); 
  const [open, setOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateUser({ ...user, name, email })); 
    onClose();
  };

  if (!user) {
    return <div>User not found</div>; 
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Update User</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditUserForm;
