import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { enrollmentsService } from '@/services';
import axios from 'axios';

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

  return res.status(httpStatus.OK).send(enrollmentWithAddress);
}

export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
  await enrollmentsService.createOrUpdateEnrollmentWithAddress({
    ...req.body,
    userId: req.userId,
  });

  return res.sendStatus(httpStatus.OK);
}

// TODO - Receber o CEP do usuário por query params. - HECHO?
export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response) {
  try {
  
    const cep = req.query.cep;

    if (!cep || cep.length != 8) {
      return res.status(400).json({ error: 'CEP inválido' });
    }

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    const data = response.data;

    if (data.erro) {
      return res.status(400).json({ error: 'CEP inexistente' });
    }

    const formattedAddress = {
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.localidade,
      uf: data.uf,
    };

    res.status(200).json(formattedAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o endereço do CEP' });
  }
}
