import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createOrUpdateEnrollmentSchema } from '@/schemas';
import httpStatus, { OK } from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

const hotelRouters = Router();

function getTest() {
  console.log('tudo ok')
  return 'ok'
}
hotelRouters
  .all('/*', authenticateToken)

export { hotelRouters };
