import React, { useState, useEffect } from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../apiSlice';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EditUserForm from './EditUserForm';
import AddUserForm from './AddUserForm';
import { logout } from '../utils/auth';

const Home = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [deleteUserMutation] = useDeleteUserMutation();
  const [selectedUserId, setSelectedUserId] = useState(null); 
  const [showAddUserForm, setShowAddUserForm] = useState(false); 
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const navigate = useNavigate(); 

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
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const cancelDelete = () => {
    setOpenDialog(false);
  };

  const handleUpdateUser = (userId) => {
    setSelectedUserId(userId); 
    setOpenEditUserDialog(true); 
  };

  const handleCloseUpdateForm = () => {
    setSelectedUserId(null); 
    setOpenEditUserDialog(false); 
    console.log('User updated successfully');
  };

  const handleAddUserClick = () => {
    setShowAddUserForm(true);
  };

  const handleAddUserFormClose = () => {
    setShowAddUserForm(false);
    console.log('User added successfully');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    console.log('Logout successful');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>User List</h2>
      <Button variant="contained" color="success" onClick={handleAddUserClick} style={{ marginBottom: '20px' }}>Add User</Button>
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
                    <Button variant="contained" color="primary" style={{ marginLeft: '8px' }} onClick={() => handleUpdateUser(user.id)}>Update</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {}
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

      <Dialog open={showAddUserForm} onClose={handleAddUserFormClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          {showAddUserForm && <AddUserForm onClose={handleAddUserFormClose} />}
        </DialogContent>
      </Dialog>

      {}
      <Dialog open={openEditUserDialog} onClose={() => setOpenEditUserDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedUserId && (
            <EditUserForm
              user={users.find(user => user.id === selectedUserId)}
              onClose={handleCloseUpdateForm}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateForm} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>

      {}
      <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</Button>
    </div>
  );
};

export default Home;
