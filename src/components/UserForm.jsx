import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, editingUser, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        age: editingUser.age || '',
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', age: '' });
  };

  return (
    
      {editingUser ? 'Edit User' : 'Add New User'}
      
      
      
      
        {editingUser ? 'Update' : 'Add'}
        {editingUser && (
          
            Cancel
          
        )}
      
    
  );
};

export default UserForm;
