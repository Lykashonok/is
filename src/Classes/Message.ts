export interface Message {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
      _id: number;
      name: string;
      avatar: string;
  };
}
export interface Chat {
  id: number,
  user1: number, 
  user2: number, 
  created: number
}