import http, { IncomingMessage, ServerResponse } from 'node:http';
import { appConfig } from './configs/app-config';
import { router } from './router';
import { logger } from './logger';
import { UnifiedHandlerResult } from './types';
import AppError from './errors/app-error';

http
  .createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const { url, method } = req;
    if (!url || !url.startsWith('/api/')) return void res.end('Not found');
    const [entityName, entityId] = url.substring(5).split('/'); // remove "/api/" substring
    if (!(entityName in router)) return void res.end('Not found');
    const handler = router.users.GET;
    logger.info(`${method} ${url}`);

    try {
      const result: UnifiedHandlerResult = await handler(
        // @ts-expect-error some handlers don't need arguments, but they are passed for simplicity and unified approach
        ...[entityName, entityId]
      );
      const data = result.data;
      const statusCode = result.statusCode || 200;
      const headers = result.headers || { 'Content-Type': 'application/json' };
      res.writeHead(statusCode, headers);
      res.end(JSON.stringify(data));
    } catch (e) {
      if (e instanceof AppError) {
        logger.error(e.message);
        res.statusCode = e.code;
        res.end(e.message);
      } else {
        logger.error('Internal Server Error');
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }
  })
  .listen(appConfig.PORT, () => {
    logger.info(`Server is listening on port: ${appConfig.PORT}`);
  });
