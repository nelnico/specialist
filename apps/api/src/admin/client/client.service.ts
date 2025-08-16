import { Injectable, NotFoundException } from '@nestjs/common';
import { ListClientsQueryDto } from './dto/list-clients.query.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ClientListItem, PaginatedResult } from '@repo/types';
import { buildPaginatedResult } from '../../shared/pagination';
import { Prisma } from '@prisma/client';

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
      id: c.id,
      username: c.user?.username ?? null,
      membershipType: c.ClientMembership?.membershipType ?? null,
      membershipEndDate: c.ClientMembership?.membershipEndDate ?? null,
      numberOfFavorites: c._count.favorites,
      numberOfReviews: c._count.review,
    }));

    return buildPaginatedResult<ClientListItem>(data, total, skip, take);
  }

  async deleteClient(id: number): Promise<{ deleted: true }> {
    try {
      await this.prisma.client.delete({ where: { id } });
      return { deleted: true as const };
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        // Record not found
        throw new NotFoundException(`Client ${id} not found`);
      }
      throw err;
    }
  }
}
