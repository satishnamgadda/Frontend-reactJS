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
    <form onSubmit={handleSubmit} className="user-form">
      <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button type="submit">{editingUser ? 'Update' : 'Add'}</button>
        {editingUser && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
