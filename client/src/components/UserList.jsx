import React from 'react';
import './styles/Slack.css'; 

const UserList = ({ users }) => {
  return (
    <ul className="user-list">
      {users.map((user, index) => (
        <li key={index} className="user-list-item">
          <img src={user.avatar} alt="User Avatar" className="user-avatar" />
          <span className="user-name">{user.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
