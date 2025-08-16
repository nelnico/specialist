import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  SearchSpecialistsDto,
  SpecialistSortKey,
} from './dto/search-specialists.dto';
import { SpecialistListItem } from '@repo/types';

@Injectable()
export class SpecialistService {
  constructor(private prisma: PrismaService) {}

  async searchSpecialists(params: SearchSpecialistsDto) {
    const {
      skip = 0,
      take = 50,
      query,
      provinceId,
      orderBy = SpecialistSortKey.Newest,
    } = params;

    const andFilters: Prisma.SpecialistWhereInput[] = [];

    if (query?.trim()) {
      const q = query.trim();
      andFilters.push({
        OR: [
          { name: { contains: q, mode: 'insensitive' as const } },
          {
            contact: {
              emails: {
                some: { email: { contains: q, mode: 'insensitive' as const } },
              },
            },
          },
          {
            contact: {
              phones: {
                some: { phone: { contains: q, mode: 'insensitive' as const } },
              },
            },
          },
          {
            contact: {
              websites: {
                some: {
                  website: { contains: q, mode: 'insensitive' as const },
                },
              },
            },
          },
        ],
      });
    }

    if (typeof provinceId === 'number' && Number.isFinite(provinceId)) {
      andFilters.push({ contact: { is: { provinceId } } });
    }

    const where: Prisma.SpecialistWhereInput =
      andFilters.length > 0 ? { AND: andFilters } : {};

    const orderByInput: Prisma.SpecialistOrderByWithRelationInput = (() => {
      switch (orderBy) {
        case SpecialistSortKey.MostReviewed:
          return { reviews: { _count: 'desc' } };
        case SpecialistSortKey.MostFavorited:
          return { favorites: { _count: 'desc' } };
        case SpecialistSortKey.Newest:
        default:
          return { createdAt: 'desc' };
      }
    })();

    const [rows, total] = await Promise.all([
      this.prisma.specialist.findMany({
        where,
        skip,
        take,
        orderBy: orderByInput,
        select: {
          id: true,
          name: true,
          specialtyIds: true,
          contact: {
            select: {
              provinceId: true,
              location1: true,
              location2: true,
              location3: true,
              phones: {
                where: { primary: true },
                take: 1,
                select: { phone: true },
              },
            },
          },
          specialistSummary: {
            select: {
              averageRating: true,
              favoritedByCount: true,
              reviewCount: true,
            },
          },
        },
      }),
      this.prisma.specialist.count({ where }),
    ]);

    // map to the shared type
    const data: SpecialistListItem[] = rows.map((s) => ({
      id: s.id,
      name: s.name,
      phone: s.contact?.phones?.[0]?.phone ?? null,
      provinceId: s.contact?.provinceId ?? null,
      location1: s.contact?.location1 ?? null,
      location2: s.contact?.location2 ?? null,
      location3: s.contact?.location3 ?? null,
      averageRating: s.specialistSummary?.averageRating ?? 0,
      reviewCount: s.specialistSummary?.reviewCount ?? 0,
      favoritedCount: s.specialistSummary?.favoritedByCount ?? 0,
      specialties: s.specialtyIds,
    }));

    return {
      data,
      pagination: { skip, take, total, hasMore: skip + take < total },
    };
  }
}
