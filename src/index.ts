import http from 'http';
import { appConfig } from './configs/app-config';
import { logger } from './logger';
import requestListener from './request-listener';

const server = http.createServer(requestListener);

server.listen(appConfig.PORT, () => {
  logger.info(`Server is running on port ${appConfig.PORT}`);
});
