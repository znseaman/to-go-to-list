import express from 'express';
import config from './config';

export const app = express();

export const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`Server running on ${config.port}...`);
    });
  } catch (e) {
    console.error(e);
  }
}