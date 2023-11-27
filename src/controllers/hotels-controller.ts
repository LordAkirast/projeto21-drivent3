import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const booking = await hotelsService.getBookingWithRoomDetails(userId);

    if (!booking) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: 'Usuário sem reserva.',
      });
    }
    const room = booking.Room; 

    
    const responseData = {
      id: booking.id,
      Room: room,
    };

    return res.status(httpStatus.OK).json(responseData);
  } catch (error) {
    console.error('Erro ao obter a reserve:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Erro interno do servidor ao obter a reserva.',
    });
  }
}

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const hotels = await hotelsService.getHotels(userId);
  res.status(httpStatus.OK).send(hotels);
}

export async function getHotelsWithRooms(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId = Number(req.params.hotelId);

  const hotelWithRooms = await hotelsService.getHotelsWithRooms(userId, hotelId);
  res.status(httpStatus.OK).send(hotelWithRooms);
}
