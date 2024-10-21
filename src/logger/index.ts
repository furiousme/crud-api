/* eslint-disable no-console */

const COLORS = {
  info: '\x1b[1;37m',
  debug: '\x1b[1;33m',
  error: '\x1b[0;31m',
};

type LOGGER_MODE = 'info' | 'debug' | 'error';

export const logger = {
  write: (message: string, mode: LOGGER_MODE) => {
    const time = new Date().toISOString();
    const formattedText = time + '\t' + message;
    const color = COLORS[mode];
    console.log(color + formattedText + '\x1b[0m');
  },
  info(message: string) {
    this.write(message, 'info');
  },
  debug(message: string) {
    this.write(message, 'debug');
  },
  error(message: string) {
    this.write(message, 'error');
  },
};
