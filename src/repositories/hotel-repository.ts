import { Enrollment } from '@prisma/client';
import { prisma } from '@/config';
import { Hotel } from '@prisma/client';

async function findAllHotels() {
  const hotels = await prisma.hotel.findMany();
  return hotels;
}

async function enrollmentVerify(id: number) {
  const enrollmentCheck = await prisma.enrollment.findFirst({
    where: { id }
  })
  return enrollmentCheck;
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;

export const hotelRepository = {
  enrollmentVerify,
  findAllHotels,
  upsert,
};
