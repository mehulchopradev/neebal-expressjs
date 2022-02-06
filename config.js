import dotenv from 'dotenv';

const result = dotenv.config(); // this will load up all the configuration from .env

const { parsed, error } = result;

if (error) {
  console.log('error in loading environment variables');
}

export default parsed;