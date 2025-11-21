import React, { useState, useEffect } from 'react';
import { userService } from './services/api';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

function App() {
  console.log("API URL:", process.env.REACT_APP_API_URL);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (userData) => {
    try {
      await userService.create(userData);
      fetchUsers();
    } catch (err) {
      setError('Failed to create user');
      console.error(err);
    }
  };

  const handleUpdate = async (userData) => {
    try {
      await userService.update(editingUser.id, userData);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      setError('Failed to update user');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.delete(id);
        fetchUsers();
      } catch (err) {
        setError('Failed to delete user');
        console.error(err);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management System</h1>
      </header>

      <main className="App-main">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="content-container">
          <div className="form-section">
            <UserForm
              editingUser={editingUser}  // ✅ FIXED PROP
              onSubmit={editingUser ? handleUpdate : handleCreate}
              onCancel={editingUser ? handleCancel : null}
            />
          </div>

          <div className="list-section">
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <UserList
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
