import { Prisma } from '@prisma/client';
import { SpecialistSortKey } from './search-specialists.dto';

export const specialistOrderByMapping: Record<
  SpecialistSortKey,
  Prisma.SpecialistOrderByWithRelationInput
> = {
  [SpecialistSortKey.Newest]: { createdAt: 'desc' },
  [SpecialistSortKey.MostReviewed]: { reviews: { _count: 'desc' } },
  [SpecialistSortKey.MostFavorited]: { favorites: { _count: 'desc' } },
};
