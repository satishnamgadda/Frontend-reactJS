import React from 'react';

const UserItem = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-item">
      <div className="user-info">
        <h4>{user.name}</h4>
        <p>Email: {user.email}</p>
        <p>Age: {user.age || 'N/A'}</p>
      </div>
      <div className="user-actions">
        <button onClick={() => onEdit(user)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(user.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserItem;
