import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      user: PropTypes.string,
      text: PropTypes.string,
      timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      avatar: PropTypes.string,
    })
  ).isRequired,
};

export default MessageList;
