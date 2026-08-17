import { AppMessageCode } from '../enums/app-message-code.enum';
import { AppMessageType } from '../enums/app-message-type.enum';
import { AppMessage } from '../interfaces/app-message.interface';

export const APP_MESSAGES: Record<AppMessageCode, AppMessage> = {
  [AppMessageCode.UserNotFound]: {
    text: 'Usuario no encontrado',
    type: AppMessageType.Warning,
  },
  [AppMessageCode.LoginInvalid]: {
    text: 'Credenciales inválidas',
    type: AppMessageType.Warning,
  },
  [AppMessageCode.LoginSuccess]: {
    text: 'Sesión iniciada correctamente',
    type: AppMessageType.Success,
  },
  [AppMessageCode.RequiredFields]: {
    text: 'Completa los campos obligatorios',
    type: AppMessageType.Warning,
  },
  [AppMessageCode.UnexpectedError]: {
    text: 'Ocurrió un error inesperado',
    type: AppMessageType.Danger,
  },
  [AppMessageCode.NetworkError]: {
    text: 'No se pudo conectar con el servidor',
    type: AppMessageType.Danger,
  },
  [AppMessageCode.AnimalCreated]: {
    text: 'Animal creado exitosamente',
    type: AppMessageType.Danger,
  },
  [AppMessageCode.DiffPaddock]: {
    text: 'El potrero destino debe ser diferente al actual.',
    type: AppMessageType.Warning,
  },
};
