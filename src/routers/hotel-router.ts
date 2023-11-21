import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getHotels } from '@/controllers/hotel-controller';
import { createOrUpdateEnrollmentSchema } from '@/schemas';
import httpStatus, { OK } from 'http-status';

const hotelRouters = Router();

function getTest() {
  console.log('tudo ok')
  return httpStatus.OK
}
//getHotels
hotelRouters
  //.all('/*', authenticateToken)
  .get('/hotels', getTest)

export { hotelRouters };
