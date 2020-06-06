export interface Message {
  _id: number;
  text: string;
  createdAt: string;
  user: {
      _id: number;
      name: string;
      avatar: string;
  };
}

export interface MessageFromDB {
  id: number;
  message: string;
  time: number;
  sender: number;
  chat: number;
}

export interface Chat {
  id: number,
  user1: number, 
  user2: number, 
  created: number,
  key: number | undefined
}