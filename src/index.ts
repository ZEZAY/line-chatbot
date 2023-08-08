import Container from 'typedi';

import { DotEnvConfig, LoggerContainerKey } from './core/plugin';
import createServer from './server';

(async () => {
  const server = await createServer();
  const logger = Container.get(LoggerContainerKey);
  const config = Container.get(DotEnvConfig);

  server.listen({ port: config.CHATBOT_API_PORT, host: config.CHATBOT_API_HOST }, (err, address) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
})();
