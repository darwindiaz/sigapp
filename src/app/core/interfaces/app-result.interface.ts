import { AppMessageCode } from '../enums/app-message-code.enum';

export type AppResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: AppMessageCode };

