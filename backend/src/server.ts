import 'dotenv/config';
import http from 'http';
import { connectDatabase } from './config/database.js';
import { createApp } from './app.js';
import { initSocket } from './socket.js';

const port = Number(process.env.PORT ?? 4000);
const app = createApp();
const server = http.createServer(app);

// Initialisation de Socket.io
initSocket(server);

connectDatabase()
  .then(() => {
    server.listen(port, () => {
      console.log(`FoodRush API listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start API:', error);
    process.exit(1);
  });
