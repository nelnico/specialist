import { Injectable } from '@nestjs/common';
import { ListClientsQueryDto } from './dto/list-clients.query.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ClientListItem, PaginatedResult } from '@repo/types';
import { buildPaginatedResult } from '../../shared/pagination';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async listClients({
    skip = 0,
    take = 25,
  }: ListClientsQueryDto): Promise<PaginatedResult<ClientListItem>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.client.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { username: true } },
          ClientMembership: {
            select: { membershipType: true, membershipEndDate: true },
          },
          _count: { select: { favorites: true, review: true } },
        },
      }),
      this.prisma.client.count(),
    ]);

    const data: ClientListItem[] = rows.map((c) => ({
      username: c.user?.username ?? null,
      membershipType: c.ClientMembership?.membershipType ?? null,
      membershipEndDate: c.ClientMembership?.membershipEndDate ?? null,
      numberOfFavorites: c._count.favorites,
      numberOfReviews: c._count.review,
    }));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return buildPaginatedResult<ClientListItem>(data, total, skip, take);
  }
}
