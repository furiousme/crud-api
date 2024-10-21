import http, { IncomingMessage, ServerResponse } from 'node:http';
import { appConfig } from './configs/app-config';
import { router } from './router';
import { logger } from './logger';
import { HTTPStatusCode, UnifiedHandlerResult } from './types';
import AppError from './errors/app-error';
import { sendNotFound } from './utils';

http
  .createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const { url, method } = req;
    const rawBody = await new Promise((resolve) => {
      let data = '';
      req.on('data', (chunk) => (data += chunk.toString()));
      req.on('end', () => resolve(data));
    });

    const body = JSON.parse(rawBody as string);

    if (!method || !url || !url.startsWith('/api/')) {
      return sendNotFound(res);
    }

    const [entityName, entityId, ...rest] = url
      .substring(5) // remove "/api/" substring
      .split('/')
      .filter((el) => el);

    if (!(entityName in router) || rest.length) return sendNotFound(res);

    const args = { entityName, entityId, body };
    const entity = router[entityName as keyof typeof router];
    const handler = entity[method as keyof typeof entity](args);
    logger.info(`${method} ${url}`);

    try {
      const result: UnifiedHandlerResult = await handler(args);
      const data = result.data;
      const statusCode = result.statusCode || HTTPStatusCode.OK;
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
        res.statusCode = HTTPStatusCode.INTERNAL_SERVER;
        res.end('Internal Server Error');
      }
    }
  })
  .listen(appConfig.PORT, () => {
    logger.info(`Server is listening on port: ${appConfig.PORT}`);
  });
