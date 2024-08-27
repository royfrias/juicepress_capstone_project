import { useState, useEffect } from 'react';
import MessageList from './MessageList';
import UserList from './UserList';
import './styles/Slack.css';

const Slack = () => {
  const [messages, setMessages] = useState([]);
  const [channelInfo, setChannelInfo] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3000/messages');
        const data = await response.json();

        // Process messages
        const messagesWithDefaults = data.messages.map((msg, index) => ({
          ...msg,
          id: msg.id || `message-${index}`,
          timestamp: msg.ts ? new Date(parseFloat(msg.ts) * 1000).toISOString() : new Date().toISOString(),
        }));

        // Sort messages by timestamp in descending order
        const sortedMessages = messagesWithDefaults.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
        setMessages(sortedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const fetchChannelInfo = async () => {
      try {
        const response = await fetch('http://localhost:3000/channel-info');
        const data = await response.json();
        setChannelInfo(data.channel);
      } catch (error) {
        console.error('Error fetching channel info:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/channel-users');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchMessages();
    fetchChannelInfo();
    fetchUsers();
  }, []);

  return (
    <div className="slack-container">
      <div className="sidebar">
        <button onClick={() => window.location.href = 'http://localhost:5173/home'} className='home-button'>Home</button>
        <div className="channel-info">
          Channel: {channelInfo ? channelInfo.name : 'Loading channel info...'}
        </div>
        <UserList users={users} />
      </div>
      <div className="message-list">
        <MessageList messages={messages} />
      </div>
    </div>
  );
};

export default Slack;
