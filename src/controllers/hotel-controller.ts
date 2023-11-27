import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { enrollmentsService } from '@/services';
import { CEP } from '@/protocols';
import { Prisma } from '@prisma/client';
import { hotelsService } from '@/services/hotel-service';




export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
  await enrollmentsService.createOrUpdateEnrollmentWithAddress({
    ...req.body,
    userId: req.userId,
  });

  return res.sendStatus(httpStatus.OK);
}

export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response): Promise<void> {
  const { cep } = req.query as CEP;

  const address = await enrollmentsService.getAddressFromCEP(cep);
  res.status(httpStatus.OK).send(address);
}
