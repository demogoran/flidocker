import * as fast from 'fastify'
import * as cors from 'fastify-cors';
import { bootstrap } from 'fastify-decorators'
import { resolve } from 'path'

const fastify = fast()

// Register handlers auto-bootstrap
fastify.register(bootstrap, {
    directory: resolve(__dirname, 'controllers'),
});
fastify.register(cors);
  

const PORT = 5000;
fastify.listen(PORT, '0.0.0.0');
console.log(`started on port ${PORT}`);