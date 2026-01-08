
import React, { useState, useEffect, useRef } from 'react';
import { Sender, Message } from './types';
import { GeminiSalesService } from './services/geminiService';
import ChatBubble from './components/ChatBubble';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showIntegration, setShowIntegration] = useState(false);
  const [salesService] = useState(() => new GeminiSalesService());
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initBot = async () => {
      setIsTyping(true);
      const welcome = await salesService.sendMessage("Inicie o atendimento focado em Ozenvita e Frete Grátis.");
      setMessages([{
        id: Date.now().toString(),
        sender: Sender.BOT,
        text: welcome,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    };
    initBot();
  }, [salesService]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (customMessage?: string) => {
    const textToSend = customMessage || inputValue;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: Sender.USER,
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const botResponse = await salesService.sendMessage(textToSend);
    
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      sender: Sender.BOT,
      text: botResponse,
      timestamp: new Date()
    }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-100 border-x border-gray-200 shadow-2xl overflow-hidden relative font-sans">
      
      {/* Checklist de Deploy */}
      {showIntegration && (
        <div className="absolute inset-0 z-50 bg-white overflow-y-auto p-6 sm:p-10">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900">ORDEM DE IMPLEMENTAÇÃO</h2>
              <p className="text-sm text-gray-500">Siga a ordem para o robô funcionar hoje.</p>
            </div>
            <button onClick={() => setShowIntegration(false)} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-none w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-gray-800">GitHub (O Cofre)</h3>
                <p className="text-sm text-gray-600">Crie um repositório no GitHub e suba todos os arquivos do projeto. Isso é a base de tudo.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-none w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-gray-800">Vercel (A Hospedagem)</h3>
                <p className="text-sm text-gray-600">No site da Vercel, importe o seu repositório do GitHub. É grátis para uso pessoal.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-none w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-gray-800">API_KEY (O Cérebro)</h3>
                <p className="text-sm text-gray-600">Nas configurações da Vercel (Environment Variables), adicione a chave <code className="bg-gray-100 px-1 rounded text-orange-600">API_KEY</code> com a sua chave do Gemini.</p>
                <p className="text-[10px] text-gray-400 mt-1 uppercase">Sem isso o robô não responde!</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-none w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-gray-800">AutoResponder (A Ponte)</h3>
                <p className="text-sm text-gray-600">No app do Android, aponte o Webserver para o seu link da Vercel terminando em <span className="text-blue-600 font-mono">/api/chat</span>.</p>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
              <p className="text-xs text-yellow-800 font-medium">
                <strong>DICA MESTRE:</strong> Use o WhatsApp Business se puder, mas o AutoResponder funciona no WhatsApp normal também!
              </p>
            </div>
          </div>

          <button 
            onClick={() => setShowIntegration(false)}
            className="w-full mt-10 bg-[#075E54] text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-[#054d44] transition-all"
          >
            ENTENDI A ORDEM! VOU SUBIR AGORA.
          </button>
        </div>
      )}

      {/* Header */}
      <header className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img src="https://picsum.photos/seed/marcal/80/80" className="w-10 h-10 rounded-full border-2 border-green-400" alt="Avatar" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#075E54]"></div>
          </div>
          <div>
            <h1 className="font-bold text-sm">Consultor de Elite 🚀</h1>
            <p className="text-[10px] text-green-300">Ozenvita Power | Online</p>
          </div>
        </div>
        <button 
          onClick={() => setShowIntegration(true)}
          className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold px-3 py-2 rounded-lg border border-white/20 transition-all uppercase tracking-wider"
        >
          Checklist Deploy
        </button>
      </header>

      {/* Scarcity Banner */}
      <div className="bg-[#128C7E] text-white text-[11px] py-1.5 px-4 text-center font-bold tracking-wide animate-pulse">
        🔥 ALERTA: FRETE GRÁTIS LIBERADO AGORA!
      </div>

      {/* Chat Area */}
      <main ref={chatContainerRef} className="flex-1 overflow-y-auto whatsapp-bg p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isTyping && (
          <div className="bg-white/90 backdrop-blur-sm text-gray-500 text-[10px] px-4 py-2 rounded-full w-fit shadow-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
            Consultor está digitando...
          </div>
        )}
      </main>

      {/* Quick Replies */}
      <div className="p-2 flex gap-2 overflow-x-auto bg-white/60 border-t border-gray-200 no-scrollbar">
        {["Qual o valor?", "Quero o link oficial!", "O frete é grátis?", "Tem depoimentos?"].map(t => (
          <button 
            key={t}
            onClick={() => handleSendMessage(t)}
            className="whitespace-nowrap bg-white border border-gray-300 rounded-full px-4 py-1.5 text-xs text-gray-700 font-semibold hover:border-green-500 hover:text-green-600 transition-all shadow-sm"
          >
            {t}
          </button>
        ))}
      </div>

      {/* Input */}
      <footer className="p-3 bg-[#F0F2F5] flex items-center gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Teste uma objeção aqui..."
          className="flex-1 bg-white border-none rounded-full px-5 py-3 text-sm shadow-sm focus:ring-2 focus:ring-[#075E54]"
        />
        <button 
          onClick={() => handleSendMessage()}
          className="bg-[#00A884] text-white p-3 rounded-full shadow-lg active:scale-90 transition-transform"
        >
          <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
        </button>
      </footer>
    </div>
  );
};

export default App;
