import { AppMessageType } from '../enums/app-message-type.enum';

export interface AppMessage {
  text: string;
  type: AppMessageType;
  duration?: number;
}
