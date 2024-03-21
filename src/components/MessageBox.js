import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const MessageBox = ({ open, onClose, message, duration }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
    if (open) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        onClose();
      }, duration || 3000); // Default duration is 3 seconds (3000 milliseconds)
      return () => clearTimeout(timer);
    }
  }, [open, onClose, duration]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Message</DialogTitle>
      <DialogContent>
        <div>{message}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageBox;
