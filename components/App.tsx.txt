
import React, { useState, useEffect, useRef } from 'react';
import { Sender, Message } from './types';
import { GeminiSalesService } from './services/geminiService';
import ChatBubble from './components/ChatBubble';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [salesService] = useState(() => new GeminiSalesService());
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initial Greeting
  useEffect(() => {
    const initBot = async () => {
      setIsTyping(true);
      const welcome = await salesService.sendMessage("Inicie o atendimento como o robô de vendas do Ozenvita. Seja persuasivo e caloroso.");
      setMessages([
        {
          id: Date.now().toString(),
          sender: Sender.BOT,
          text: welcome,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    };
    initBot();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: Sender.USER,
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const botResponse = await salesService.sendMessage(inputValue);
    
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: Sender.BOT,
      text: botResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-100 border-x border-gray-200 shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="bg-[#075E54] text-white p-4 flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/ozenvita/100/100" 
              alt="Sales Rep" 
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#075E54]"></div>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Consultor Ozenvita</h1>
            <p className="text-xs opacity-80 italic">Especialista em Performance e Saúde</p>
          </div>
        </div>
        <div className="flex space-x-4 opacity-80">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
        </div>
      </header>

      {/* Product Banner (Small Scarcity Message) */}
      <div className="bg-[#128C7E] text-white text-[11px] py-1 px-4 text-center font-medium">
        🔥 Condição Exclusiva: Frete Grátis e Bônus "Mindset de Sucesso" apenas para as próximas 2 horas.
      </div>

      {/* Chat Area */}
      <main 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto whatsapp-bg p-4 md:p-6 space-y-2 custom-scrollbar"
      >
        <div className="flex justify-center mb-6">
          <span className="bg-[#E1F3FB] text-[#4F6D7A] text-[11px] px-3 py-1 rounded-md shadow-sm uppercase font-semibold">
            Hoje
          </span>
        </div>

        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex justify-start mb-4 animate-pulse">
            <div className="bg-white text-gray-500 text-xs px-4 py-2 rounded-2xl shadow-sm italic">
              Consultor está digitando...
            </div>
          </div>
        )}
      </main>

      {/* Objection Quick Replies */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 flex space-x-2 overflow-x-auto no-scrollbar">
        {["Qual o valor?", "Quais os benefícios?", "É seguro?", "Tem depoimentos?"].map((text) => (
          <button
            key={text}
            onClick={() => {
              setInputValue(text);
              // Small delay to make it feel natural
              setTimeout(handleSendMessage, 100);
            }}
            className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-2 rounded-full border border-gray-300 transition-colors"
          >
            {text}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <footer className="bg-[#F0F2F5] p-3 flex items-center space-x-3 border-t border-gray-200">
        <button className="text-gray-500 hover:text-gray-700 p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
        <button className="text-gray-500 hover:text-gray-700 p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
        </button>
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-white rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 shadow-sm border-none"
        />

        {inputValue.trim() ? (
          <button 
            onClick={handleSendMessage}
            className="bg-[#00A884] text-white p-3 rounded-full shadow-lg hover:bg-[#008F72] transition-colors"
          >
            <svg className="w-6 h-6 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
          </button>
        ) : (
          <button className="bg-[#00A884] text-white p-3 rounded-full shadow-lg hover:bg-[#008F72] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          </button>
        )}
      </footer>
    </div>
  );
};

export default App;
