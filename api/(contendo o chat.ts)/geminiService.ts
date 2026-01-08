
import { GoogleGenAI } from @googlegenai;

const AFFILIATE_LINK = httpsapp.monetizze.com.brrAZF25661885u=NB82502;

const SYSTEM_INSTRUCTION = `
Você é um robô de vendas de elite especializado em Ozenvita. Estilo Pablo Marçal autoritário, persuasivo e focado em desbloqueio.
Gatilhos Frete Grátis hoje, Escassez (últimas unidades), PNL para rapport.
Link de fechamento ${AFFILIATE_LINK}

REGRAS DE OURO
1. Sempre que o cliente estiver pronto ou perguntar o preço, mande o link oficial destacando que o Frete é por sua conta hoje.
2. Use emojis para criar proximidade (ex 🚀, 🔥, 💡).
3. Seja rápido, direto e quebre objeções de segurança citando o site oficial.
`;

export default async function handler(req any, res any) {
   Garante que apenas requisições POST funcionem (padrão do AutoResponder)
  if (req.method !== 'POST') {
    return res.status(405).json({ error 'Método não permitido' });
  }

   O AutoResponder geralmente envia o texto no campo query ou message
  const userMessage = req.body.message  req.body.query  ;

  if (!userMessage) {
    return res.status(200).json({ replies [{ text Opa! Não consegui te ouvir direito. O que você busca com o Ozenvita hoje 🚀 }] });
  }

  try {
     Inicializa a IA usando a chave que você vai colocar na Vercel
    const ai = new GoogleGenAI({ apiKey process.env.API_KEY  '' });
    
    const response = await ai.models.generateContent({
      model 'gemini-3-flash-preview',
      contents userMessage,
      config {
        systemInstruction SYSTEM_INSTRUCTION,
        temperature 0.8,
      },
    });

    const botReply = response.text  Estou focado na sua transformação. Vamos garantir seu kit hoje;
    
     Resposta formatada para o AutoResponder para WA (JSON com array replies)
    return res.status(200).json({ 
      replies [
        { 
          text botReply 
        }
      ] 
    });

  } catch (error) {
    console.error(Erro na API, error);
    return res.status(200).json({ 
      replies [
        { 
          text Nossa alta demanda por Ozenvita travou o sistema por um segundo! 🔥 Mas já voltei. O que você precisa saber agora para mudar sua saúde 
        }
      ] 
    });
  }
}
