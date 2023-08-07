import Container from 'typedi';

import { DotEnvConfig, Logger } from './core/plugin';
import createServer from './server';

(async () => {
  const server = await createServer();
  const logger: Logger = Container.get('Logger');
  const config: DotEnvConfig = Container.get('DotEnvConfig');

  server.listen({ port: config.CHATBOT_API_PORT, host: config.CHATBOT_API_HOST }, (err, address) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
})();
