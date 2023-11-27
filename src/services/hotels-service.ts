import { TicketStatus } from '@prisma/client';
import { invalidDataError, notFoundError } from '@/errors';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import { enrollmentRepository, hotelRepository, ticketsRepository } from '@/repositories';

async function validateUserBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  const type = ticket.TicketType;

  // if (ticket.status === TicketStatus.RESERVED || type.isRemote || !type.includesHotel) {
  //   throw cannotListHotelsError();
  // }
}

async function getHotels(userId: number) {
  await validateUserBooking(userId);

  const hotels = await hotelRepository.findHotels();
  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await validateUserBooking(userId);

  if (!hotelId || isNaN(hotelId)) throw invalidDataError('hotelId');

  const hotelWithRooms = await hotelRepository.findRoomsByHotelId(hotelId);
  if (!hotelWithRooms) throw notFoundError();

  return hotelWithRooms;
}

async function getBooking(userId: number) {
  await validateUserBooking(userId);

  const booking = await hotelRepository.findBooking();
  if (booking.length === 0) throw notFoundError();

  return booking;
}

async function getBookingWithRoomDetails(userId: number) {
  console.log('roomwithroomdetails 0 ')
  await validateUserBooking(userId);

  console.log('roomwithroomdetails 1 ')

  const booking = await hotelRepository.findBooking();
  if (booking.length === 0) throw notFoundError();

  console.log('roomwithroomdetails 2 ')

  const room = await hotelRepository.findRoomsByHotelId(booking[0].roomId);

  if (!room) {
    throw notFoundError();
  }

  return {
    id: booking[0].id,
    Room: room,
  };
}


export const hotelsService = {
  getHotels,
  getHotelsWithRooms,
  getBooking,
  getBookingWithRoomDetails
};