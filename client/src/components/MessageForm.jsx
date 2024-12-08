import React, { useState } from 'react';
import axios from 'axios';

function MessageForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/messages', { text: message });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageForm;
