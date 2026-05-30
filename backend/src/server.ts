import 'dotenv/config';
import { connectDatabase } from './config/database.js';
import { createApp } from './app.js';

const port = Number(process.env.PORT ?? 4000);
const app = createApp();

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`FoodRush API listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start API:', error);
    process.exit(1);
  });
