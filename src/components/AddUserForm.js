import React, { useState } from 'react';
import { useAddUserMutation } from '../apiSlice';
import MessageBox from './MessageBox'; // Import the MessageBox component

const AddUserForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addUserMutation] = useAddUserMutation();

  // State for managing message box
  const [messageBox, setMessageBox] = useState({ open: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUserMutation({ name, email });
      onClose();
      setMessageBox({ open: true, message: 'User added' });
      console.log('User added'); 
    } catch (error) {
      console.error('Error adding user:', error);
      setMessageBox({ open: true, message: `Error adding user: ${error.message}` });
    }
    // Close message box after 5 seconds
    setTimeout(() => {
      setMessageBox({ open: false, message: '' });
    }, 5000);
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>

      {messageBox.open && <MessageBox message={messageBox.message} />}
    </div>
  );
};

export default AddUserForm;
