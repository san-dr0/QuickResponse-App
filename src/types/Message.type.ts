export interface ConversationDto {
  id?: string;
  users: string[];
  messages: MessageDto[];
}

export interface MessageUserDto {
  id?: string;
  profile: string;
  firstname: string;
  middlename: string;
  lastname: string;
}

export interface MessageDto {
  receiver: MessageUserDto;
  sender: MessageUserDto;
  message: string;
  date: string;
}
