import http from 'node:http';
import { cpus } from 'node:os';
import { appConfig } from './configs/app-config';
import { logger } from './logger';
import requestListener from './request-listener';
import cluster from 'cluster';

const startServer = (port: number | string) => {
  const server = http.createServer(requestListener);
  server.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
};

const numCPUs = cpus().length;

if (appConfig.MODE === 'multi') {
  if (cluster.isPrimary) {
    logger.info(`Primary ${process.pid} is running`);
    let currentWorker = 0;

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    const server = http.createServer((req, res) => {
      if (!cluster.workers) return;

      const workerKeys = Object.keys(cluster.workers);
      const worker = cluster.workers[workerKeys[currentWorker]];
      currentWorker = (currentWorker + 1) % workerKeys.length;

      const proxyReq = http.request(
        {
          hostname: 'localhost',
          port: +appConfig.PORT + worker!.id,
          path: req.url,
          method: req.method,
          headers: req.headers,
        },
        (proxyRes) => {
          res.writeHead(proxyRes.statusCode!, proxyRes.headers);
          proxyRes.pipe(res, { end: true });
        }
      );

      req.pipe(proxyReq, { end: true });
    });

    server.listen(appConfig.PORT);
    logger.info(`Load balancer listening on port ${appConfig.PORT}`);

    cluster.on('exit', (worker) => {
      logger.info(`worker ${worker.process.pid} died`);
    });
  } else {
    startServer(+appConfig.PORT + (cluster.worker?.id || 1));
    logger.info(`Worker ${process.pid} started`);
  }
} else {
  startServer(appConfig.PORT);
}
