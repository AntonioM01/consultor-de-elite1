
export enum Sender {
  USER = 'user',
  BOT = 'bot'
}

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  timestamp: Date;
}

export interface ProductInfo {
  name: string;
  price: string;
  benefits: string[];
}
