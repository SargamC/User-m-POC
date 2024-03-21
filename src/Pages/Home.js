import React, { useState, useEffect } from 'react';
import { useGetUsersQuery, useDeleteUserMutation, useAddUserMutation, useUpdateUserMutation } from '../apiSlice';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import EditUserForm from '../components/UserForm'; // Import the UserForm component
import { logout } from '../utils/auth';
import MessageBox from '../components/MessageBox'; // Import the MessageBox component

const Home = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [deleteUserMutation] = useDeleteUserMutation();
  const [addUserMutation] = useAddUserMutation();
  const [updateUserMutation] = useUpdateUserMutation();
  const [selectedUserId, setSelectedUserId] = useState(null); 
  const [showUserForm, setShowUserForm] = useState(false); 
  const [openDialog, setOpenDialog] = useState(false);

  // State for managing message box
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [messageBoxMessage, setMessageBoxMessage] = useState('');

  useEffect(() => {
    if (error) {
      console.error('Error fetching users:', error);
    }
  }, [error]);

  const handleDeleteUser = (userId) => {
    setOpenDialog(true);
    setSelectedUserId(userId);
  };

  const confirmDelete = () => {
    deleteUserMutation(selectedUserId)
      .unwrap()
      .then(() => {
        setOpenDialog(false);
        console.log('User deleted successfully');
        setOpenMessageDialog(true);
        setMessageBoxMessage('User deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        setOpenMessageDialog(true);
        setMessageBoxMessage(`Error deleting user: ${error.message}`);
      });
  };

  const cancelDelete = () => {
    setOpenDialog(false);
  };

  const handleAddOrUpdateUser = async (formData) => {
    let message;
    try {
      if (selectedUserId) {
        await updateUserMutation({ id: selectedUserId, updatedUser: formData });
        message = 'User updated successfully';
      } else {
        await addUserMutation(formData);
        message = 'User added successfully';
      }
      setOpenMessageDialog(true);
      setMessageBoxMessage(message);
    } catch (error) {
      console.error('Error adding/updating user:', error);
      setOpenMessageDialog(true);
      setMessageBoxMessage(`Error: ${error.message}`);
    }
  };

  const handleEditUser = (userId) => {
    setSelectedUserId(userId); 
    setShowUserForm(true); 
  };

  const handleCloseUserForm = (operationCompleted) => {
    if (operationCompleted) {
      console.log('User operation completed');
    }
    setSelectedUserId(null); 
    setShowUserForm(false); 
  };

  const handleLogout = () => {
    const logoutConfirmed = window.confirm('Are you sure you want to logout?');
    if (logoutConfirmed) {
      logout();
      window.location.href = '/login'; // Redirect to login page after logout
      console.log('Logout successful');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>User List</h2>
      <Button variant="contained" color="success" onClick={() => setShowUserForm(true)} style={{ marginBottom: '20px' }}>Add User</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', border: '1px solid #ddd' }}>Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', border: '1px solid #ddd' }}>Email</TableCell>
              <TableCell style={{ fontWeight: 'bold', border: '1px solid #ddd' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell style={{ border: '1px solid #ddd' }}>{user.name}</TableCell>
                  <TableCell style={{ border: '1px solid #ddd' }}>{user.email}</TableCell>
                  <TableCell style={{ border: '1px solid #ddd' }}>
                    <Button variant="contained" color="error" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                    <Button variant="contained" color="primary" style={{ marginLeft: '8px' }} onClick={() => handleEditUser(user.id)}>Update</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <MessageBox open={openMessageDialog} onClose={() => setOpenMessageDialog(false)} message={messageBoxMessage} />

      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showUserForm} onClose={() => handleCloseUserForm(false)}>
        <DialogTitle>{selectedUserId ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          {showUserForm && <EditUserForm user={users.find(user => user.id === selectedUserId)} onClose={(operationCompleted) => handleCloseUserForm(operationCompleted)} onAddOrUpdateUser={handleAddOrUpdateUser} />}
        </DialogContent>
      </Dialog>

      <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</Button>
    </div>
  );
};

export default Home;
