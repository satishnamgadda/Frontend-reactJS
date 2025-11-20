import React from 'react';

const UserItem = ({ user, onEdit, onDelete }) => {
  return (
    
      
        {user.name}
        Email: {user.email}
        Age: {user.age || 'N/A'}
      
      
        <button onClick={() => onEdit(user)} className="edit-btn">
          Edit
        
        <button onClick={() => onDelete(user.id)} className="delete-btn">
          Delete
        
      
    
  );
};

export default UserItem;
