
import React from 'react';
import { Sender, Message } from '../types';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isBot = message.sender === Sender.BOT;

  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] px-4 py-2 rounded-2xl shadow-sm text-sm lg:text-base leading-relaxed relative ${
          isBot
            ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            : 'bg-[#DCF8C6] text-gray-800 rounded-tr-none'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.text}</div>
        <div className={`text-[10px] mt-1 text-right opacity-60`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        
        {/* Triangle Tail */}
        <div 
          className={`absolute top-0 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ${
            isBot 
              ? '-left-2 border-r-[10px] border-r-white' 
              : '-right-2 border-l-[10px] border-l-[#DCF8C6]'
          }`}
        />
      </div>
    </div>
  );
};

export default ChatBubble;
