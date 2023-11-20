import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getHotels } from '@/controllers/hotel-controller';
import { createOrUpdateEnrollmentSchema } from '@/schemas';

const hotelRouters = Router();

hotelRouters
  .get('/hotels', getHotels)
  .all('/*', authenticateToken)

export { hotelRouters };
