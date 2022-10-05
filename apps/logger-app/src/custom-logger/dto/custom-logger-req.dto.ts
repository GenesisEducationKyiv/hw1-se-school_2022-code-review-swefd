export interface CustomLoggerRequestDto {
  name: string;
  timeStamp: string;
  message: string;
  type: 'error' | 'warn' | 'debug' | 'info';
}
